window.db = {
    sobre: {
        title: "SOBRE",
        isScript: true,
        text: `
<div class="script-transition">FADE IN:</div>
<div class="script-scene">INT. CIDADE DE DEUS - RIO DE JANEIRO - DIA</div>
Patrick Sonata caminha pelas ruas que moldaram seu olhar. A câmera foca na vivacidade do 
ambiente.
<div class="script-char">NARRADOR (V.O.)</div>
<div class="script-dialog">Trinta e sete anos de vida. Vinte de estrada. Patrick não apenas 
observa a periferia; ele a traduz em narrativa.</div>
<div class="script-scene">INT. TEATRO / COLETIVO BONOBANDO - NOITE</div>
O suor no palco reflete anos de dedicação. A formação que veio do asfalto e dos projetos 
sociais.
<div class="script-char">PATRICK</div>
<div class="script-dialog">O teatro me deu a voz, mas a Cidade de Deus me deu o repertório. 
Minha trajetória é um mapa de vivências que o roteiro organiza.</div>
<div class="script-transition">FADE OUT.</div>`
    },
    perfil: {
        title: "PERFIL",
        isScript: true,
        text: `
<div class="script-scene">INT. ESCRITÓRIO DE CRIAÇÃO - NOITE</div>
Luz focada em uma mesa de trabalho. Pilhas de escaletas e livros de dramaturgia.
<div class="script-char">PERFIL PROFISSIONAL</div>
<div class="script-dialog">Roteirista, Ator e Especialista em Narrativas Periféricas.</div>
<div class="script-scene">SKILLS EM DESTAQUE</div>
- Dramaturgia Urbana e Humor Crítico.
- Formação em Palhaçaria Clássica.
- Consultoria para Projetos de Identidade Afro-brasileira.
<div class="script-char">VISÃO</div>
<div class="script-dialog">Escrever a quebrada sem estereótipos, focando na humanidade e na 
potência estética do real.</div>
<div class="script-transition">CORTE PARA PRETO.</div>`
    },
    trabalho: {
        title: "TRABALHO",
        hasSubmenu: true,
        submenus: ["PORTFÓLIO"],
        text: "Selecione PORTFÓLIO para ver os projetos realizados."
    },
    portfolio: {
        title: "PORTFÓLIO DE PROJETOS",
        isPortfolio: true,
        projects: [
            {
                id: "pablo_luisao",
                title: "PABLO E LUISÃO",
                role: "Roteirista",
                info: "Série Original Globoplay. Criação de Paulo Vieira.",
                cover: "assets/images/works/pabloeluisao.webp"
            },
            {
                id: "humor_negro",
                title: "HUMOR NEGRO",
                role: "Roteirista",
                info: "Especial e Série - Multishow/Globoplay.",
                cover: "assets/images/works/humornegro.webp"
            },
            {
                id: "cidade_correria",
                title: "CIDADE CORRERIA",
                role: "Autor e Ator",
                info: "Teatro e Documentário sobre vivências urbanas.",
                cover: "assets/images/works/cidadecorreriapeca.webp"
            },
            {
                id: "pelada",
                title: "PELADA",
                role: "Roteirista",
                info: "Longa-metragem de ficção (Comédia).",
                cover: "assets/images/works/pelada.webp"
            },
            {
                id: "jongo",
                title: "JONGO",
                role: "Direção Narrativa",
                info: "Audiovisual, Memória e Ancestralidade.",
                cover: "assets/images/works/jongo.webp"
            },
            {
                id: "zorra",
                title: "ZORRA",
                role: "Roteirista",
                info: "Programa de Humor - TV Globo",
                cover: "assets/images/works/zorralogo.jpg"
            }
        ]
    },
    cdd: {
        title: "CDD 3001 - O JOGO",
        text: `
            <div style="text-align:center; padding:40px; 
background:#0a0a0a; border:2px solid #00FF41;">
                <h2 style="color:#00FF41; font-size:2rem; 
margin-bottom:20px;">🎮 CDD 3001: A RESISTÊNCIA</h2>
                
                <p style="color:#fff; margin:20px 0; line-height:1.8;">
                    Jogo afrofuturista de ação 2D ambientado na Cidade de 
Deus em 3001.<br>
                    Resgate os 5 moradores, lute contra os monstros 
brancos e restaure a cor do território.
                </p>
                
                <div style="display:grid; 
grid-template-columns:repeat(3,1fr); gap:20px; margin:40px 0;">
                    <div style="border:1px solid #00FF41; padding:20px;">
                        <span style="font-size:2rem;">🏍️</span>
                        <p style="color:#00FF41;">Moto Sankofa-X</p>
                    </div>
                    <div style="border:1px solid #00FF41; padding:20px;">
                        <span style="font-size:2rem;">⚡</span>
                        <p style="color:#00FF41;">Power-ups</p>
                    </div>
                    <div style="border:1px solid #00FF41; padding:20px;">
                        <span style="font-size:2rem;">👾</span>
                        <p style="color:#00FF41;">3 Níveis</p>
                    </div>
                </div>
                
                <a href="game-cdd3001/index.html" target="_blank"
                   style="display:inline-block; padding:15px 40px; 
                          background:#00FF41; color:#000; 
                          text-decoration:none; font-weight:bold; 
                          border:none; cursor:pointer; margin:20px 0;
                          font-size:1.2rem;">
                    🎮 JOGAR AGORA
                </a>
                
                <p style="color:#888; font-size:0.8rem; margin-top:20px;">
                    Setas: mover | Espaço: pular | X: atacar | E: moto | 
F: pulso
                </p>
            </div>
        `
    },    
patika: { 
        title: "PATIKA", 
        text: "Software de auxílio para roteiristas focado em escaletas e estruturação 
narrativa para criadores independentes." 
    },
    aulas: { 
        title: "AULAS", 
        text: "Mentorias e oficinas de roteiro voltadas para a democratização da escrita 
cinematográfica." 
    }
};
