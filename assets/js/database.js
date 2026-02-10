window.db = {
    sobre: {
        title: "SOBRE",
        isScript: true,
        text: `
<div class="script-transition">FADE IN:</div>
<div class="script-scene">INT. CIDADE DE DEUS - RIO DE JANEIRO - DIA</div>
Patrick Sonata caminha pelas ruas que moldaram seu olhar. A câmera foca na vivacidade do ambiente.
<div class="script-char">NARRADOR (V.O.)</div>
<div class="script-dialog">Trinta e sete anos de vida. Vinte de estrada. Patrick não apenas observa a periferia; ele a traduz em narrativa.</div>
<div class="script-scene">INT. TEATRO / COLETIVO BONOBANDO - NOITE</div>
O suor no palco reflete anos de dedicação. A formação que veio do asfalto e dos projetos sociais.
<div class="script-char">PATRICK</div>
<div class="script-dialog">O teatro me deu a voz, mas a Cidade de Deus me deu o repertório. Minha trajetória é um mapa de vivências que o roteiro organiza.</div>
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
<div class="script-dialog">Escrever a quebrada sem estereótipos, focando na humanidade e na potência estética do real.</div>
<div class="script-transition">CORTE PARA PRETO.</div>`
    },
    trabalho: {
        title: "PORTFÓLIO DE PROJETOS",
        isGalleryHub: true,
        projects: [
            {
                id: "pablo_luisao",
                title: "PABLO E LUISÃO",
                role: "Roteirista",
                info: "Série Original Globoplay. Criação de Paulo Vieira.",
                cover: "assets/images/works/pabloeluisao.webp",
                images: ["assets/images/works/pabloeluisao.webp"] 
            },
            {
                id: "humor_negro",
                title: "HUMOR NEGRO",
                role: "Roteirista",
                info: "Especial e Série - Multishow/Globoplay.",
                cover: "assets/images/works/humornegro.webp",
                images: ["assets/images/works/humornegro.webp"]
            },
            {
                id: "cidade_correria",
                title: "CIDADE CORRERIA",
                role: "Autor e Ator",
                info: "Teatro e Documentário sobre vivências urbanas.",
                cover: "assets/images/works/cidadecorreriapeca.webp",
                images: ["assets/images/works/cidadecorreriapeca.webp", "assets/images/works/doccidadecorreria.webp"]
            },
            {
                id: "pelada",
                title: "PELADA",
                role: "Roteirista",
                info: "Longa-metragem de ficção (Comédia).",
                cover: "assets/images/works/pelada.webp",
                images: ["assets/images/works/pelada.webp"]
            },
            {
                id: "jongo",
                title: "JONGO",
                role: "Direção Narrativa",
                info: "Audiovisual, Memória e Ancestralidade.",
                cover: "assets/images/works/jongo.webp",
                images: ["assets/images/works/jongo.webp"]
            }
        ],
        text: "Selecione um projeto para ver os detalhes técnicos."
    },
    cdd: { 
        title: "CDD - 3001", 
        isGame: true,
        text: "Projeto transmídia explorando o futuro da Cidade de Deus."
    },
    patika: { 
        title: "PATIKA", 
        text: "Software de auxílio para roteiristas focado em escaletas e estruturação narrativa para criadores independentes." 
    },
    aulas: { 
        title: "AULAS", 
        text: "Mentorias e oficinas de roteiro voltadas para a democratização da escrita cinematográfica." 
    }
}; // Fim do banco de dados