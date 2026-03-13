// ===== CDD 3001 — Laboratório Narrativo =====

// Arrays base de dados para gerar conteúdo
const personagens = [
    {nome: "Léo 'O Matuto'", habilidade: "Negociação de favela", origem: "Zona Norte"},
    {nome: "Bella Silva", habilidade: "Investigação policial", origem: "Delegacia"},
    {nome: "Joice", habilidade: "Sobrevivência urbana", origem: "Favela do Rio"},
    {nome: "Sabrina", habilidade: "Liderança diplomática", origem: "África"}
];

const missoes = [
    "Recuperar o pacote perdido na favela",
    "Investigar a chegada de um novo grupo rival",
    "Roubar informações da corporação corrupta",
    "Organizar baile funk clandestino"
];

const historias = [
    "Um jovem descobre um segredo antigo que pode mudar sua comunidade",
    "Uma aliança improvável entre moradores e policiais",
    "A ascensão de um líder na periferia durante uma crise",
    "Um evento misterioso conecta diferentes bairros do Rio"
];

// Funções de geração aleatória
function gerarAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Geradores individuais
function gerarPersonagem() {
    const p = gerarAleatorio(personagens);
    const tema = document.getElementById('tema-input').value;
    const output = `<strong>Personagem:</strong> ${p.nome}, <strong>Habilidade:</strong> ${p.habilidade}, <strong>Origem:</strong> ${p.origem}` + (tema ? ` — Tema: ${tema}` : '');
    document.getElementById('gerador-output').innerHTML = output;
}

function gerarMissao() {
    const m = gerarAleatorio(missoes);
    const tema = document.getElementById('tema-input').value;
    const output = `<strong>Missão:</strong> ${m}` + (tema ? ` — Tema: ${tema}` : '');
    document.getElementById('gerador-output').innerHTML = output;
}

function gerarHistoria() {
    const h = gerarAleatorio(historias);
    const tema = document.getElementById('tema-input').value;
    const output = `<strong>História:</strong> ${h}` + (tema ? ` — Tema: ${tema}` : '');
    document.getElementById('gerador-output').innerHTML = output;
}

// Gerar tudo de uma vez
function gerarTudo() {
    gerarPersonagem();
    gerarMissao();
    gerarHistoria();
}

// Gerenciar lista de missões
function adicionarMissao() {
    const input = document.getElementById('nova-missao');
    if (!input.value) return alert("Digite a missão!");
    const lista = document.getElementById('lista-missoes');
    const item = document.createElement('div');
    item.className = 'missao-item';
    item.textContent = input.value;
    lista.appendChild(item);
    input.value = '';
}
// ===== CDD 3001 — Laboratório Narrativo v2 =====

// Carregar missões salvas do localStorage
function carregarMissoes() {
    const lista = document.getElementById('lista-missoes');
    lista.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('missoes') || '[]');
    saved.forEach(m => {
        const item = document.createElement('div');
        item.className = 'missao-item';
        item.textContent = m;
        // botão de remover
        const btn = document.createElement('button');
        btn.textContent = '❌';
        btn.style.marginLeft = '10px';
        btn.onclick = () => { removerMissao(m); };
        item.appendChild(btn);
        lista.appendChild(item);
    });
}

// Adicionar missão e salvar
function adicionarMissao() {
    const input = document.getElementById('nova-missao');
    if (!input.value) return alert("Digite a missão!");
    const saved = JSON.parse(localStorage.getItem('missoes') || '[]');
    saved.push(input.value);
    localStorage.setItem('missoes', JSON.stringify(saved));
    input.value = '';
    carregarMissoes();
}

// Remover missão
function removerMissao(missao) {
    let saved = JSON.parse(localStorage.getItem('missoes') || '[]');
    saved = saved.filter(m => m !== missao);
    localStorage.setItem('missoes', JSON.stringify(saved));
    carregarMissoes();
}

// Exportar dados gerados
function exportarDados() {
    const savedMissoes = JSON.parse(localStorage.getItem('missoes') || '[]');
    const exportObj = {
        data: new Date().toISOString(),
        missoes: savedMissoes,
        personagens: personagens,
        historias: historias
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cdd3001_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Inicialização
document.addEventListener('DOMContentLoaded', carregarMissoes);

// ===== CDD 3001 — Ultimate v1 =====

const personagens = [];
const missoes = [];
const objetos = [];

function gerarPersonagem() {
    const nomes = ["Zinho", "Binho", "Lelé", "Tati", "MC Laranja", "Dona Nega"];
    const funcoes = ["líder de gangue", "passista de baile", "DJ de funk", "vendedor de lanche", "curioso do morro"];
    const origem = ["Cidade de Deus", "Morro do Borel", "Vila Kennedy", "Favela do Jacarezinho"];
    const nome = nomes[Math.floor(Math.random()*nomes.length)];
    const func = funcoes[Math.floor(Math.random()*funcoes.length)];
    const local = origem[Math.floor(Math.random()*origem.length)];
    const personagem = `${nome} — ${func} (${local})`;
    personagens.push(personagem);
    atualizarOutput();
}

function gerarMissao() {
    const acoes = ["proteger o baile", "entregar encomenda", "resgatar amigo", "capturar rival", "vender drogas"];
    const lugares = ["praça central", "rua do tráfico", "beira do rio", "fundo de viela", "quadra da comunidade"];
    const tema = document.getElementById('tema-input-ultimate')?.value || "";
    const acao = acoes[Math.floor(Math.random()*acoes.length)];
    const lugar = lugares[Math.floor(Math.random()*lugares.length)];
    const missao = tema ? `${acao} no ${tema}` : `${acao} na ${lugar}`;
    missoes.push(missao);
    atualizarOutput();
}

function gerarObjeto() {
    const itens = ["moto tunada", "rádio de mão", "fita de baile funk", "camiseta da favela", "bola de futebol"];
    const item = itens[Math.floor(Math.random()*itens.length)];
    objetos.push(item);
    atualizarOutput();
}

function gerarTudoUltimate() {
    gerarPersonagem();
    gerarMissao();
    gerarObjeto();
}

function atualizarOutput() {
    const output = document.getElementById('gerador-output-ultimate');
    output.innerHTML = "<h3>Personagens:</h3><ul>" + personagens.map(p=>`<li>${p}</li>`).join('') + "</ul>";
    output.innerHTML += "<h3>Missões:</h3><ul>" + missoes.map(m=>`<li>${m}</li>`).join('') + "</ul>";
    output.innerHTML += "<h3>Objetos:</h3><ul>" + objetos.map(o=>`<li>${o}</li>`).join('') + "</ul>";
}

// Exportação ultimate
function exportarDadosUltimate() {
    const exportObj = {
        data: new Date().toISOString(),
        personagens: personagens,
        missoes: missoes,
        objetos: objetos
    };
    const blob = new Blob([JSON.stringify(exportObj,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cdd3001_ultimate_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}


// ===== CDD 3001 — RPG SIMULAÇÃO =====

function gerarPersonagem() {
    const nomes = ["Zinho", "Binho", "Lelé", "Tati", "MC Laranja", "Dona Nega"];
    const funcoes = ["líder de gangue", "passista de baile", "DJ de funk", "vendedor de lanche", "curioso do morro"];
    const origem = ["Cidade de Deus", "Morro do Borel", "Vila Kennedy", "Favela do Jacarezinho"];
    const nome = nomes[Math.floor(Math.random()*nomes.length)];
    const func = funcoes[Math.floor(Math.random()*funcoes.length)];
    const local = origem[Math.floor(Math.random()*origem.length)];
    const stats = {forca: Math.floor(Math.random()*10+1), agilidade: Math.floor(Math.random()*10+1), carisma: Math.floor(Math.random()*10+1), pontos:0};
    const personagem = {nome:`${nome} — ${func}`, origem:local, stats: stats};
    personagens.push(personagem);
    atualizarRanking();
    atualizarOutput();
}

function atualizarRanking() {
    const div = document.getElementById('ranking-personagens');
    div.innerHTML = "<ul>" + personagens.map(p=>`<li>${p.nome} (${p.origem}) — F:${p.stats.forca} A:${p.stats.agilidade} C:${p.stats.carisma} Pts:${p.stats.pontos}</li>`).join('') + "</ul>";
}

function simularMissao() {
    if(missoes.length===0 || personagens.length===0){
        alert("Crie pelo menos uma missão e um personagem!");
        return;
    }
    const personagem = personagens[Math.floor(Math.random()*personagens.length)];
    const missao = missoes[Math.floor(Math.random()*missoes.length)];
    const sucesso = (Math.random()*10) + personagem.stats.forca + personagem.stats.agilidade > 12;
    const output = document.getElementById('simulacao-output');
    if(sucesso){
        personagem.stats.pontos += 5;
        output.innerHTML = `<p>✅ ${personagem.nome} completou a missão "${missao}" e ganhou 5 pontos!</p>`;
    } else {
        output.innerHTML = `<p>❌ ${personagem.nome} falhou na missão "${missao}"</p>`;
    }
    atualizarRanking();
}

function gerarObjeto() {
    const itens = ["moto tunada", "rádio de mão", "fita de baile funk", "camiseta da favela", "bola de futebol"];
    const item = itens[Math.floor(Math.random()*itens.length)];
    objetos.push(item);
    atualizarInventario();
    atualizarOutput();
}

function atualizarInventario() {
    const div = document.getElementById('inventario');
    div.innerHTML = "<ul>" + objetos.map(o=>`<li>${o}</li>`).join('') + "</ul>";
}


// ===== CDD 3001 — V2 RPG Avançado =====

function gerarMissaoDiaria(){
    const acoes = ["vender lanches", "participar do baile funk", "entregar encomenda", "curtir o morro", "explorar o terreno"];
    const locais = ["Quadra do morro", "Rua principal", "Praça central", "Beco secreto", "Rocinha da CDD"];
    const missao = `${acoes[Math.floor(Math.random()*acoes.length)]} na ${locais[Math.floor(Math.random()*locais.length)]}`;
    missoesDiarias.push(missao);
    atualizarMissoesDiarias();
}

function atualizarMissoesDiarias(){
    const div = document.getElementById('lista-missoes-diarias');
    div.innerHTML = "<ul>" + missoesDiarias.map(m=>`<li>${m}</li>`).join('') + "</ul>";
}

function eventoDiario(){
    const eventos = [
        "Baile funk na comunidade — carisma +2 para todos",
        "Operação policial — chance de perder pontos",
        "Venda de produtos locais — ganha +3 pontos",
        "Treino de parkour — agilidade +2",
        "Reunião de líderes de favela — força +1, carisma +1"
    ];
    const evento = eventos[Math.floor(Math.random()*eventos.length)];
    personagens.forEach(p=>{
        if(evento.includes("carisma")) p.stats.carisma += 2;
        if(evento.includes("agilidade")) p.stats.agilidade += 2;
        if(evento.includes("força")) p.stats.forca += 1;
        if(evento.includes("ganha +3")) p.stats.pontos += 3;
        if(evento.includes("perder pontos")) p.stats.pontos = Math.max(0,p.stats.pontos-2);
    });
    atualizarRanking();
    document.getElementById('evento-output').innerHTML = `<p>🎲 Evento do dia: ${evento}</p>`;
}

function atualizarEconomiaFavela(){
    const totalPontos = personagens.reduce((acc,p)=>acc+p.stats.pontos,0);
    const div = document.getElementById('economia-favela');
    div.innerHTML = `<p>Total de pontos na favela: ${totalPontos}</p>`;
}

// Atualizar economia automaticamente a cada ação
setInterval(atualizarEconomiaFavela, 3000);

