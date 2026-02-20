// Sistema de Diálogo CDD 3001
class SistemaDialogo {
    constructor(rpg) {
        this.rpg = rpg;
        this.dialogos = {
            marcos: {
                nome: 'Marcos',
                icone: '👤',
                falas: [
                    { texto: 'E aí, arquivista? Já viu os Brancos hoje?', respostas: [
                        { texto: 'Conte mais sobre os Brancos', proximo: 1 },
                        { texto: 'Preciso de equipamentos', proximo: 2 }
                    ]},
                    { texto: 'Os Brancos eram humanos... até 72h atrás.', respostas: [
                        { texto: 'Como identificar um?', proximo: 3 },
                        { texto: 'Tchau', acao: 'fim' }
                    ]},
                    { texto: 'Pega essa faca, vai precisar.', respostas: [
                        { texto: 'Obrigado!', acao: 'item', item: 'faca', xp: 10 }
                    ]},
                    { texto: 'Olhos vidrados, pele pálida. Eles ficam Brancos em 3 dias.', respostas: [
                        { texto: 'E os Branquelos?', proximo: 4 },
                        { texto: 'Entendi', acao: 'fim' }
                    ]},
                    { texto: 'Branquelos são os que tão começando. 24h só. Ainda dá pra salvar... talvez.', respostas: [
                        { texto: 'Valeu, Marcos', acao: 'fim' }
                    ]}
                ]
            },
            djurema: {
                nome: 'D. Jurema',
                icone: '👵',
                falas: [
                    { texto: 'Chegue mais, filho. Tô guardando as memórias desde 2057.', respostas: [
                        { texto: 'Quero ver o diário', proximo: 1 },
                        { texto: 'Benção', acao: 'bencao', xp: 5 }
                    ]},
                    { texto: 'O diário tá na igreja. Mas cuidado com os Eco.', respostas: [
                        { texto: 'O que são Eco?', proximo: 2 },
                        { texto: 'Vou lá', acao: 'missao', missao: 'diario_jurema' }
                    ]},
                    { texto: 'Eco são os que tão há meses. Perderam tudo, até a forma.', respostas: [
                        { texto: 'E os Alfa?', proximo: 3 },
                        { texto: 'Tô indo', acao: 'fim' }
                    ]},
                    { texto: 'Alfa é o bicho grande. Fica longe. Só deus na causa.', respostas: [
                        { texto: 'Obrigado', acao: 'fim' }
                    ]}
                ]
            }
        };
    }

    iniciarDialogo(personagem) {
        if (!this.dialogos[personagem]) return false;
        
        this.dialogoAtual = {
            personagem: personagem,
            falaIndex: 0
        };
        
        this.mostrarFala();
        return true;
    }

    mostrarFala() {
        const dialogo = this.dialogos[this.dialogoAtual.personagem];
        const fala = dialogo.falas[this.dialogoAtual.falaIndex];
        
        // Criar elemento de diálogo
        const container = document.createElement('div');
        container.className = 'dialogo-container';
        container.innerHTML = `
            <div class="dialogo-box" style="background: #14181c; border: 1px solid #1e293b; padding: 20px; margin: 20px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <span style="font-size: 30px;">${dialogo.icone}</span>
                    <strong style="color: #ffd966;">${dialogo.nome}</strong>
                </div>
                <p style="color: #94a3b8; margin-bottom: 20px;">${fala.texto}</p>
                <div class="respostas" style="display: flex; flex-direction: column; gap: 10px;">
                    ${fala.respostas.map((resposta, index) => `
                        <button onclick="sistemaDialogo.escolherResposta(${index})" 
                                style="background: #0f1215; border: 1px solid #1e293b; color: #94a3b8; padding: 10px; text-align: left; cursor: pointer;">
                            ▶ ${resposta.texto}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Remover diálogo anterior
        const anterior = document.querySelector('.dialogo-container');
        if (anterior) anterior.remove();
        
        document.body.appendChild(container);
    }

    escolherResposta(respostaIndex) {
        const dialogo = this.dialogos[this.dialogoAtual.personagem];
        const fala = dialogo.falas[this.dialogoAtual.falaIndex];
        const resposta = fala.respostas[respostaIndex];
        
        // Processar ação da resposta
        if (resposta.acao) {
            switch(resposta.acao) {
                case 'fim':
                    document.querySelector('.dialogo-container').remove();
                    break;
                case 'item':
                    this.rpg.coletarItem(resposta.item, 1);
                    this.rpg.ganharXP(resposta.xp, 'diálogo');
                    document.querySelector('.dialogo-container').remove();
                    break;
                case 'missao':
                    this.rpg.iniciarMissao(resposta.missao);
                    document.querySelector('.dialogo-container').remove();
                    break;
                case 'bencao':
                    this.rpg.ganharXP(resposta.xp, 'benção');
                    this.dialogoAtual.falaIndex = resposta.proximo || 0;
                    this.mostrarFala();
                    break;
            }
        } else if (resposta.proximo !== undefined) {
            this.dialogoAtual.falaIndex = resposta.proximo;
            this.mostrarFala();
        }
    }
}

// Inicializar
window.sistemaDialogo = new SistemaDialogo(window.rpg);
