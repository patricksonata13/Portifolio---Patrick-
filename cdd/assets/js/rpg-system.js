// ============================================
// CDD 3001 - SISTEMA RPG ULTRA COMPLETO v3.0
// ============================================

class CDDRPG {
    constructor() {
        this.versao = "3.0";
        this.dataCriacao = "3001";
        
        // ========================================
        // 1. JOGADOR - TODOS OS ATRIBUTOS
        // ========================================
        this.jogador = {
            // Básico
            id: this.gerarId(),
            nome: "Arquivista",
            classe: "Resistente",
            nivel: 1,
            xp: 0,
            xpProximoNivel: 1000,
            
            // Atributos principais
            atributos: {
                forca: 8,
                agilidade: 8,
                inteligencia: 10,
                percepcao: 12,
                carisma: 10,
                constituicao: 10,
                sorte: 5
            },
            
            // Recursos
            recursos: {
                memorias: 0,
                memoriasMax: 100,
                moedas: 0,
                fragmentos: 0,
                chaves: 0,
                suprimentos: 0
            },
            
            // Progresso
            progresso: {
                modulosCompletos: [],
                conquistas: [],
                segredos: [],
                visitas: [],
                missoesCompletas: [],
                inimigosDerrotados: 0,
                tempoJogado: 0
            },
            
            // Inventário
            inventario: {
                itens: [],
                equipamentos: [],
                consumiveis: [],
                especiais: []
            },
            
            // Estatísticas
            estatisticas: {
                xpTotal: 0,
                memoriasColetadas: 0,
                segredosEncontrados: 0,
                modulosExplorados: 0,
                missoesConcluidas: 0,
                mortes: 0,
                acertos: 0,
                erros: 0
            },
            
            // Sistema de save
            ultimoSave: null,
            savesCriados: 0
        };
        
        // ========================================
        // 2. MÓDULOS DO JOGO
        // ========================================
        this.modulos = {
            // Módulos principais
            terminal: { 
                id: "terminal",
                nome: "🏠 TERMINAL", 
                xp: 0, 
                progresso: 0, 
                max: 1, 
                icon: "🏠",
                descricao: "Centro de comando da resistência",
                status: "online"
            },
            historia: { 
                id: "historia",
                nome: "📜 HISTÓRIA", 
                xp: 150, 
                progresso: 0, 
                max: 10, 
                icon: "📜",
                descricao: "A pandemia dos Brancos no Rio 3001",
                status: "online"
            },
            mapa: { 
                id: "mapa",
                nome: "🗺️ MAPA", 
                xp: 100, 
                progresso: 0, 
                max: 12, 
                icon: "🗺️",
                descricao: "Cidade de Deus e zonas de risco",
                status: "online"
            },
            personagens: { 
                id: "personagens",
                nome: "👥 PERSONAGENS", 
                xp: 75, 
                progresso: 0, 
                max: 4, 
                icon: "👥",
                descricao: "Marcos, D. Jurema, Luan, Seu Jorge",
                status: "online"
            },
            brancos: { 
                id: "brancos",
                nome: "👻 OS BRANCOS", 
                xp: 200, 
                progresso: 0, 
                max: 3, 
                icon: "👻",
                descricao: "Sentinela, Eco, Alfa",
                status: "online"
            },
            musica: { 
                id: "musica",
                nome: "🎵 MÚSICA", 
                xp: 25, 
                progresso: 0, 
                max: 10, 
                icon: "🎵",
                descricao: "Trilha da resistência e Rádio Vigia",
                status: "online"
            },
            arte: { 
                id: "arte",
                nome: "🎨 ARTE", 
                xp: 50, 
                progresso: 0, 
                max: 8, 
                icon: "🎨",
                descricao: "Murais e grafites da comunidade",
                status: "online"
            },
            diario: { 
                id: "diario",
                nome: "📖 DIÁRIO", 
                xp: 150, 
                progresso: 0, 
                max: 47, 
                icon: "📖",
                descricao: "Memórias de D. Jurema (2057-3001)",
                status: "online"
            },
            inventario: { 
                id: "inventario",
                nome: "🎒 INVENTÁRIO", 
                xp: 0, 
                progresso: 0, 
                max: 30, 
                icon: "🎒",
                descricao: "Itens coletados na resistência",
                status: "online"
            },
            missoes: { 
                id: "missoes",
                nome: "⚔️ MISSÕES", 
                xp: 200, 
                progresso: 0, 
                max: 5, 
                icon: "⚔️",
                descricao: "Missões da resistência",
                status: "online"
            },
            estatisticas: { 
                id: "estatisticas",
                nome: "📊 ESTATÍSTICAS", 
                xp: 0, 
                progresso: 0, 
                max: 1, 
                icon: "📊",
                descricao: "Dados do jogador",
                status: "online"
            },
            game: { 
                id: "game",
                nome: "🎮 GAME", 
                xp: 500, 
                progresso: 45, 
                max: 100, 
                icon: "🎮",
                descricao: "Versão jogável em desenvolvimento",
                status: "dev"
            },
            videos: { 
                id: "videos",
                nome: "🎬 VÍDEOS", 
                xp: 100, 
                progresso: 2, 
                max: 8, 
                icon: "🎬",
                descricao: "Teasers e making of",
                status: "online"
            },
            roteiro: { 
                id: "roteiro",
                nome: "📝 ROTEIRO", 
                xp: 75, 
                progresso: 12, 
                max: 15, 
                icon: "📝",
                descricao: "Páginas decifradas",
                status: "online"
            },
            curiosidades: { 
                id: "curiosidades",
                nome: "🔍 CURIOSIDADES", 
                xp: 200, 
                progresso: 5, 
                max: 25, 
                icon: "🔍",
                descricao: "Easter eggs e segredos",
                status: "online"
            }
        };
        
        // ========================================
        // 3. CONQUISTAS (50+)
        // ========================================
        this.conquistas = [
            // Básicas (1-10)
            { id: "c1", nome: "Primeiro Passo", desc: "Acesse o CDD 3001", icon: "👣", xp: 50, categoria: "basico" },
            { id: "c2", nome: "Explorador", desc: "Visite 5 módulos", icon: "🗺️", xp: 100, categoria: "basico" },
            { id: "c3", nome: "Aventureiro", desc: "Visite 10 módulos", icon: "🌍", xp: 200, categoria: "basico" },
            { id: "c4", nome: "Mestre Explorador", desc: "Visite todos os 15 módulos", icon: "🏆", xp: 500, categoria: "basico" },
            
            // Memórias (11-20)
            { id: "c5", nome: "Colecionador", desc: "10 memórias", icon: "🧠", xp: 100, categoria: "memoria" },
            { id: "c6", nome: "Arquivista", desc: "25 memórias", icon: "🧠", xp: 250, categoria: "memoria" },
            { id: "c7", nome: "Historiador", desc: "50 memórias", icon: "🧠", xp: 500, categoria: "memoria" },
            { id: "c8", nome: "Memória Viva", desc: "100 memórias", icon: "🧠", xp: 1000, categoria: "memoria" },
            
            // Níveis (21-30)
            { id: "c9", nome: "Iniciante", desc: "Nível 2", icon: "⭐", xp: 100, categoria: "nivel" },
            { id: "c10", nome: "Resistente", desc: "Nível 5", icon: "⭐⭐", xp: 300, categoria: "nivel" },
            { id: "c11", nome: "Guerreiro", desc: "Nível 10", icon: "⭐⭐⭐", xp: 600, categoria: "nivel" },
            { id: "c12", nome: "Lenda", desc: "Nível 20", icon: "👑", xp: 2000, categoria: "nivel" },
            
            // Brancos (31-40)
            { id: "c13", nome: "Caçador", desc: "Derrote 10 Sentinelas", icon: "👁️", xp: 200, categoria: "combate" },
            { id: "c14", nome: "Matador", desc: "Derrote 50 Sentinelas", icon: "⚔️", xp: 500, categoria: "combate" },
            { id: "c15", nome: "Exterminador", desc: "Derrote 100 Sentinelas", icon: "💀", xp: 1000, categoria: "combate" },
            { id: "c16", nome: "Caçador de Ecos", desc: "Derrote 5 Ecos", icon: "👂", xp: 300, categoria: "combate" },
            { id: "c17", nome: "Matador de Alfa", desc: "Derrote 1 Alfa", icon: "👑", xp: 1000, categoria: "combate" },
            
            // Missões (41-45)
            { id: "c18", nome: "Resistente", desc: "Complete 5 missões", icon: "⚔️", xp: 200, categoria: "missao" },
            { id: "c19", nome: "Herói", desc: "Complete 10 missões", icon: "🛡️", xp: 500, categoria: "missao" },
            { id: "c20", nome: "Lenda da Resistência", desc: "Complete 20 missões", icon: "🏆", xp: 1000, categoria: "missao" },
            
            // Segredos (46-50)
            { id: "c21", nome: "Curioso", desc: "Encontre 5 segredos", icon: "🥚", xp: 100, categoria: "segredo" },
            { id: "c22", nome: "Detetive", desc: "Encontre 10 segredos", icon: "🔍", xp: 250, categoria: "segredo" },
            { id: "c23", nome: "Mestre dos Segredos", desc: "Encontre 25 segredos", icon: "🕵️", xp: 500, categoria: "segredo" },
            
            // Especiais (51-55)
            { id: "c24", nome: "Veterano", desc: "Jogue por 10 horas", icon: "⏰", xp: 300, categoria: "especial" },
            { id: "c25", nome: "Dedicado", desc: "Jogue por 24 horas", icon: "⌛", xp: 1000, categoria: "especial" },
            { id: "c26", nome: "Viciado", desc: "Jogue por 100 horas", icon: "🎮", xp: 5000, categoria: "especial" },
            { id: "c27", nome: "Colecionador", desc: "50 itens no inventário", icon: "🎒", xp: 300, categoria: "especial" },
            { id: "c28", nome: "Tesouro", desc: "100 itens no inventário", icon: "💎", xp: 1000, categoria: "especial" }
        ];
        
        // ========================================
        // 4. ITENS DO INVENTÁRIO
        // ========================================
        this.itensDisponiveis = [
            // Memórias
            { id: "m1", nome: "Fragmento da Origem", desc: "Memória de 2047", tipo: "memoria", raridade: "raro", icon: "🧠", valor: 50 },
            { id: "m2", nome: "Primeiro Teaser", desc: "Memória de 2052", tipo: "memoria", raridade: "comum", icon: "🎬", valor: 30 },
            { id: "m3", nome: "Queda do Muro", desc: "Memória de 2078", tipo: "memoria", raridade: "raro", icon: "🧱", valor: 60 },
            { id: "m4", nome: "Evolução dos Brancos", desc: "Memória de 2095", tipo: "memoria", raridade: "epico", icon: "👻", valor: 100 },
            { id: "m5", nome: "Natal de 2099", desc: "Última festa", tipo: "memoria", raridade: "lendario", icon: "🎄", valor: 200 },
            
            // Armas
            { id: "a1", nome: "Estaca de Madeira", desc: "Arma improvisada", tipo: "arma", raridade: "comum", icon: "🔨", dano: 5 },
            { id: "a2", nome: "Facão", desc: "Arma do Seu Jorge", tipo: "arma", raridade: "raro", icon: "🔪", dano: 15 },
            { id: "a3", nome: "Besta", desc: "Arma do Marcos", tipo: "arma", raridade: "epico", icon: "🏹", dano: 25 },
            { id: "a4", nome: "Lança-chamas", desc: "Contra os Brancos", tipo: "arma", raridade: "lendario", icon: "🔥", dano: 50 },
            
            // Itens especiais
            { id: "s1", nome: "Diário de D. Jurema", desc: "Página 1", tipo: "especial", raridade: "epico", icon: "📖" },
            { id: "s2", nome: "Mapa da Resistência", desc: "Todos os locais", tipo: "especial", raridade: "raro", icon: "🗺️" },
            { id: "s3", nome: "Rádio Vigia", desc: "Comunicação 24h", tipo: "especial", raridade: "epico", icon: "📻" },
            { id: "s4", nome: "Sangue de Alfa", desc: "Raro", tipo: "especial", raridade: "lendario", icon: "💉" },
            
            // Consumíveis
            { id: "c1", nome: "Ração", desc: "+10 energia", tipo: "consumivel", raridade: "comum", icon: "🥫" },
            { id: "c2", nome: "Kit Médico", desc: "Cura ferimentos", tipo: "consumivel", raridade: "raro", icon: "💊" },
            { id: "c3", nome: "Municação", desc: "Para a besta", tipo: "consumivel", raridade: "comum", icon: "🔫" }
        ];
        
        // ========================================
        // 5. MISSÕES
        // ========================================
        this.missoes = [
            {
                id: "m1",
                nome: "O Primeiro Fragmento",
                tipo: "principal",
                nivel: 1,
                xp: 200,
                objetivos: [
                    { id: "o1", desc: "Visitar História", xp: 50, completo: false },
                    { id: "o2", desc: "Encontrar 3 memórias", xp: 75, completo: false },
                    { id: "o3", desc: "Falar com D. Jurema", xp: 75, completo: false }
                ],
                recompensas: {
                    xp: 200,
                    itens: ["m1"],
                    moedas: 100
                }
            },
            {
                id: "m2",
                nome: "Caça aos Sentinelas",
                tipo: "principal",
                nivel: 2,
                xp: 300,
                objetivos: [
                    { id: "o4", desc: "Derrotar 3 Sentinelas", xp: 100, completo: false },
                    { id: "o5", desc: "Coletar fragmentos", xp: 100, completo: false },
                    { id: "o6", desc: "Voltar ao acampamento", xp: 100, completo: false }
                ],
                recompensas: {
                    xp: 300,
                    itens: ["a2"],
                    moedas: 200
                }
            },
            {
                id: "m3",
                nome: "O Eco da Fábrica",
                tipo: "principal",
                nivel: 3,
                xp: 400,
                objetivos: [
                    { id: "o7", desc: "Explorar a Fábrica", xp: 150, completo: false },
                    { id: "o8", desc: "Derrotar o Eco", xp: 150, completo: false },
                    { id: "o9", desc: "Recuperar suprimentos", xp: 100, completo: false }
                ],
                recompensas: {
                    xp: 400,
                    itens: ["s3"],
                    moedas: 300
                }
            },
            {
                id: "m4",
                nome: "Memórias da Igreja",
                tipo: "secundaria",
                nivel: 1,
                xp: 150,
                objetivos: [
                    { id: "o10", desc: "Ouvir D. Jurema", xp: 50, completo: false },
                    { id: "o11", desc: "Coletar 5 memórias", xp: 100, completo: false }
                ],
                recompensas: {
                    xp: 150,
                    itens: ["c2"],
                    moedas: 100
                }
            },
            {
                id: "m5",
                nome: "Treinamento com Seu Jorge",
                tipo: "secundaria",
                nivel: 1,
                xp: 100,
                objetivos: [
                    { id: "o12", desc: "Completar treino", xp: 50, completo: false },
                    { id: "o13", desc: "Acertar 10 alvos", xp: 50, completo: false }
                ],
                recompensas: {
                    xp: 100,
                    itens: ["c3"],
                    moedas: 50
                }
            },
            {
                id: "m6",
                nome: "O Alfa",
                tipo: "epico",
                nivel: 5,
                xp: 1000,
                objetivos: [
                    { id: "o14", desc: "Sobreviver na Praça", xp: 300, completo: false },
                    { id: "o15", desc: "Derrotar o Alfa", xp: 500, completo: false },
                    { id: "o16", desc: "Trazer prova", xp: 200, completo: false }
                ],
                recompensas: {
                    xp: 1000,
                    itens: ["a4", "s4"],
                    moedas: 1000
                }
            }
        ];
        
        // ========================================
        // 6. INICIALIZAÇÃO
        // ========================================
        this.carregar();
        this.iniciarSistemas();
    }
    
    // ========================================
    // 7. SISTEMA DE ID
    // ========================================
    gerarId() {
        return 'cdd-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }
    
    // ========================================
    // 8. SISTEMA DE SALVAMENTO
    // ========================================
    salvar() {
        this.jogador.ultimoSave = new Date().toISOString();
        this.jogador.savesCriados++;
        
        // Salvar múltiplos slots
        localStorage.setItem('cdd3001_rpg', JSON.stringify(this.jogador));
        localStorage.setItem('cdd3001_backup', JSON.stringify(this.jogador));
        localStorage.setItem('cdd3001_versao', this.versao);
        
        this.log('💾 Progresso salvo!');
        return true;
    }
    
    carregar() {
        try {
            const save = localStorage.getItem('cdd3001_rpg');
            if (save) {
                const dados = JSON.parse(save);
                this.jogador = this.mergeDeep(this.jogador, dados);
                this.log('✅ Save carregado!');
                return true;
            }
        } catch (e) {
            this.log('❌ Erro ao carregar save');
            
            // Tentar backup
            const backup = localStorage.getItem('cdd3001_backup');
            if (backup) {
                this.jogador = JSON.parse(backup);
                this.log('⚠️ Backup carregado!');
                return true;
            }
        }
        return false;
    }
    
    resetar() {
        if (confirm("☠️ Resetar todo o progresso?")) {
            localStorage.removeItem('cdd3001_rpg');
            localStorage.removeItem('cdd3001_backup');
            localStorage.removeItem('cdd3001_visitas');
            localStorage.removeItem('cdd3001_missoes');
            location.reload();
        }
    }
    
    mergeDeep(target, source) {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object') {
                if (!target[key]) target[key] = {};
                this.mergeDeep(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }
    
    // ========================================
    // 9. SISTEMA DE LOG
    // ========================================
    log(mensagem, tipo = 'info') {
        const consoleEl = document.getElementById('consoleLog');
        if (consoleEl) {
            const hora = new Date().toLocaleTimeString();
            const cor = tipo === 'erro' ? '#f87171' : 
                       tipo === 'sucesso' ? '#4ade80' : 
                       tipo === 'aviso' ? '#ffd966' : '#94a3b8';
            
            const entry = document.createElement('div');
            entry.style.cssText = `color: ${cor}; padding: 2px 0; font-size: 12px;`;
            entry.innerHTML = `[${hora}] ${mensagem}`;
            
            consoleEl.insertBefore(entry, consoleEl.firstChild);
            
            // Manter apenas últimas 50 mensagens
            while (consoleEl.children.length > 50) {
                consoleEl.removeChild(consoleEl.lastChild);
            }
        }
        console.log(`[CDD] ${mensagem}`);
    }
    
    // ========================================
    // 10. SISTEMA DE NOTIFICAÇÕES
    // ========================================
    notificar(titulo, mensagem, cor = '#ffd966', tempo = 5000) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${cor};
            color: #0a0c0e;
            padding: 15px 25px;
            border: 2px solid #1e293b;
            z-index: 9999;
            animation: slideIn 0.3s;
            font-family: 'Courier New', monospace;
            max-width: 350px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        `;
        notif.innerHTML = `<strong>${titulo}</strong><br>${mensagem}`;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s';
            setTimeout(() => notif.remove(), 300);
        }, tempo);
    }
    
    // ========================================
    // 11. SISTEMA DE XP
    // ========================================
    ganharXP(quantidade, origem) {
        this.jogador.xp += quantidade;
        this.jogador.estatisticas.xpTotal += quantidade;
        
        this.log(`✨ +${quantidade} XP • ${origem}`, 'sucesso');
        
        // Verificar level up
        while (this.jogador.xp >= this.jogador.xpProximoNivel) {
            this.levelUp();
        }
        
        this.atualizarInterface();
        this.salvar();
        
        // Verificar conquistas relacionadas a XP
        this.verificarConquistas();
    }
    
    levelUp() {
        this.jogador.nivel++;
        this.jogador.xp -= this.jogador.xpProximoNivel;
        this.jogador.xpProximoNivel = Math.floor(this.jogador.xpProximoNivel * 1.5);
        
        // Ganha bônus por level up
        this.jogador.recursos.moedas += 100 * this.jogador.nivel;
        this.jogador.atributos.sorte += 1;
        
        // Efeito visual
        this.notificar(
            '⭐ LEVEL UP!', 
            `Agora você é nível ${this.jogador.nivel}\n+${100 * this.jogador.nivel} moedas`,
            '#ffd966',
            8000
        );
        
        this.log(`⭐ LEVEL UP! Nível ${this.jogador.nivel}!`, 'sucesso');
    }
    
    // ========================================
    // 12. SISTEMA DE CONQUISTAS
    // ========================================
    verificarConquistas() {
        const novas = [];
        
        this.conquistas.forEach(conq => {
            if (this.jogador.progresso.conquistas.includes(conq.id)) return;
            
            let desbloqueada = false;
            
            switch(conq.id) {
                // Básicas
                case "c1": desbloqueada = true; break;
                case "c2": desbloqueada = this.jogador.progresso.visitas.length >= 5; break;
                case "c3": desbloqueada = this.jogador.progresso.visitas.length >= 10; break;
                case "c4": desbloqueada = this.jogador.progresso.visitas.length >= 15; break;
                
                // Memórias
                case "c5": desbloqueada = this.jogador.recursos.memorias >= 10; break;
                case "c6": desbloqueada = this.jogador.recursos.memorias >= 25; break;
                case "c7": desbloqueada = this.jogador.recursos.memorias >= 50; break;
                case "c8": desbloqueada = this.jogador.recursos.memorias >= 100; break;
                
                // Níveis
                case "c9": desbloqueada = this.jogador.nivel >= 2; break;
                case "c10": desbloqueada = this.jogador.nivel >= 5; break;
                case "c11": desbloqueada = this.jogador.nivel >= 10; break;
                case "c12": desbloqueada = this.jogador.nivel >= 20; break;
                
                // Combate
                case "c13": desbloqueada = this.jogador.progresso.inimigosDerrotados >= 10; break;
                case "c14": desbloqueada = this.jogador.progresso.inimigosDerrotados >= 50; break;
                case "c15": desbloqueada = this.jogador.progresso.inimigosDerrotados >= 100; break;
                
                // Missões
                case "c18": desbloqueada = this.jogador.progresso.missoesCompletas.length >= 5; break;
                case "c19": desbloqueada = this.jogador.progresso.missoesCompletas.length >= 10; break;
                case "c20": desbloqueada = this.jogador.progresso.missoesCompletas.length >= 20; break;
                
                // Segredos
                case "c21": desbloqueada = this.jogador.progresso.segredos.length >= 5; break;
                case "c22": desbloqueada = this.jogador.progresso.segredos.length >= 10; break;
                case "c23": desbloqueada = this.jogador.progresso.segredos.length >= 25; break;
            }
            
            if (desbloqueada) {
                this.jogador.progresso.conquistas.push(conq.id);
                this.ganharXP(conq.xp, `conquista: ${conq.nome}`);
                this.notificar(
                    '🏆 CONQUISTA!',
                    `${conq.icon} ${conq.nome}\n${conq.desc}`,
                    '#b3a0ff',
                    8000
                );
                novas.push(conq);
            }
        });
        
        return novas;
    }
    
    // ========================================
    // 13. SISTEMA DE MÓDULOS
    // ========================================
    visitarModulo(moduloId) {
        if (!this.modulos[moduloId]) return false;
        
        const modulo = this.modulos[moduloId];
        
        if (!this.jogador.progresso.visitas.includes(moduloId)) {
            this.jogador.progresso.visitas.push(moduloId);
            this.jogador.estatisticas.modulosExplorados++;
            this.ganharXP(10, `primeira visita: ${modulo.nome}`);
            
            // Chance de encontrar segredo
            if (Math.random() < 0.1) {
                this.encontrarSegredo(`segredo_${moduloId}`);
            }
        }
        
        modulo.progresso = Math.min(modulo.progresso + 1, modulo.max);
        
        if (modulo.progresso >= modulo.max && !this.jogador.progresso.modulosCompletos.includes(moduloId)) {
            this.jogador.progresso.modulosCompletos.push(moduloId);
            this.ganharXP(modulo.xp, `módulo completo: ${modulo.nome}`);
            this.notificar('✅ MÓDULO COMPLETO!', modulo.nome, '#4ade80');
        }
        
        this.salvar();
        this.verificarConquistas();
        return true;
    }
    
    abrirModulo(moduloId) {
        if (!this.modulos[moduloId]) {
            this.log(`❌ Módulo ${moduloId} não encontrado`, 'erro');
            return;
        }
        
        this.log(`📂 Acessando: ${this.modulos[moduloId].nome}...`);
        this.visitarModulo(moduloId);
        
        // Redirecionar
        setTimeout(() => {
            if (moduloId === 'perfil' || moduloId === 'diario' || moduloId === 'estatisticas') {
                window.location.href = `/cdd/${moduloId}.html`;
            } else {
                window.location.href = `/cdd/${moduloId}/`;
            }
        }, 500);
    }
    
    // ========================================
    // 14. SISTEMA DE MEMÓRIAS
    // ========================================
    coletarMemoria(quantidade = 1) {
        this.jogador.recursos.memorias += quantidade;
        this.jogador.estatisticas.memoriasColetadas += quantidade;
        
        if (this.jogador.recursos.memorias > this.jogador.recursos.memoriasMax) {
            this.jogador.recursos.memorias = this.jogador.recursos.memoriasMax;
        }
        
        this.ganharXP(5 * quantidade, 'memória coletada');
        this.verificarConquistas();
        this.salvar();
    }
    
    // ========================================
    // 15. SISTEMA DE SEGREDOS
    // ========================================
    encontrarSegredo(id) {
        if (!this.jogador.progresso.segredos.includes(id)) {
            this.jogador.progresso.segredos.push(id);
            this.jogador.estatisticas.segredosEncontrados++;
            this.ganharXP(50, 'segredo encontrado!');
            
            this.notificar(
                '🔍 SEGREDO!',
                'Você encontrou um easter egg!',
                '#b3a0ff',
                6000
            );
            
            this.verificarConquistas();
            this.salvar();
        }
    }
    
    // ========================================
    // 16. SISTEMA DE MISSÕES
    // ========================================
    iniciarMissao(missaoId) {
        const missao = this.missoes.find(m => m.id === missaoId);
        if (!missao) return false;
        
        this.log(`⚔️ Missão iniciada: ${missao.nome}`, 'sucesso');
        return true;
    }
    
    completarObjetivo(missaoId, objetivoId) {
        const missao = this.missoes.find(m => m.id === missaoId);
        if (!missao) return false;
        
        const objetivo = missao.objetivos.find(o => o.id === objetivoId);
        if (!objetivo || objetivo.completo) return false;
        
        objetivo.completo = true;
        this.ganharXP(objetivo.xp, `objetivo: ${objetivo.desc}`);
        
        // Verificar se missão está completa
        const todosCompletos = missao.objetivos.every(o => o.completo);
        if (todosCompletos) {
            this.completarMissao(missaoId);
        }
        
        this.salvar();
        return true;
    }
    
    completarMissao(missaoId) {
        const missao = this.missoes.find(m => m.id === missaoId);
        if (!missao) return false;
        
        if (!this.jogador.progresso.missoesCompletas.includes(missaoId)) {
            this.jogador.progresso.missoesCompletas.push(missaoId);
            this.jogador.estatisticas.missoesConcluidas++;
            
            // Recompensas
            this.ganharXP(missao.recompensas.xp, `missão completa: ${missao.nome}`);
            this.jogador.recursos.moedas += missao.recompensas.moedas;
            
            missao.recompensas.itens.forEach(itemId => {
                this.adicionarItem(itemId);
            });
            
            this.notificar(
                '⚔️ MISSÃO COMPLETA!',
                `${missao.nome}\n+${missao.recompensas.xp} XP`,
                '#4ade80',
                8000
            );
            
            this.verificarConquistas();
            this.salvar();
        }
        
        return true;
    }
    
    // ========================================
    // 17. SISTEMA DE INVENTÁRIO
    // ========================================
    adicionarItem(itemId) {
        const item = this.itensDisponiveis.find(i => i.id === itemId);
        if (!item) return false;
        
        this.jogador.inventario.itens.push({
            ...item,
            dataAquisicao: new Date().toISOString()
        });
        
        this.log(`🎒 Item adquirido: ${item.nome}`, 'sucesso');
        this.salvar();
        return true;
    }
    
    removerItem(itemId) {
        const index = this.jogador.inventario.itens.findIndex(i => i.id === itemId);
        if (index !== -1) {
            this.jogador.inventario.itens.splice(index, 1);
            this.salvar();
            return true;
        }
        return false;
    }
    
    // ========================================
    // 18. SISTEMA DE COMBATE
    // ========================================
    combater(inimigo) {
        const dano = Math.floor(Math.random() * 20) + this.jogador.atributos.forca;
        const acertou = dano > 10;
        
        if (acertou) {
            this.jogador.estatisticas.acertos++;
            this.log(`⚔️ Acertou! Dano: ${dano}`, 'sucesso');
            return true;
        } else {
            this.jogador.estatisticas.erros++;
            this.log(`❌ Errou!`, 'erro');
            return false;
        }
    }
    
    derrotarInimigo(tipo) {
        this.jogador.progresso.inimigosDerrotados++;
        this.ganharXP(25, `derrotou ${tipo}`);
        this.verificarConquistas();
    }
    
    // ========================================
    // 19. SISTEMA DE TEMPO
    // ========================================
    iniciarTemporizador() {
        // Contar tempo jogado (minutos)
        setInterval(() => {
            this.jogador.progresso.tempoJogado++;
            this.salvar();
        }, 60000);
        
        // Auto-save a cada 5 minutos
        setInterval(() => {
            this.salvar();
        }, 300000);
        
        // Verificar conquistas a cada minuto
        setInterval(() => {
            this.verificarConquistas();
        }, 60000);
    }
    
    // ========================================
    // 20. INTERFACE
    // ========================================
    atualizarInterface() {
        // Atualizar elementos comuns em todas as páginas
        const elementos = {
            '.nivel-atual': this.jogador.nivel,
            '.xp-atual': this.jogador.xp,
            '.xp-max': this.jogador.xpProximoNivel,
            '.memorias-atual': this.jogador.recursos.memorias,
            '.memorias-max': this.jogador.recursos.memoriasMax,
            '.moedas-atual': this.jogador.recursos.moedas,
            '.visitas-atual': this.jogador.progresso.visitas.length
        };
        
        for (let [seletor, valor] of Object.entries(elementos)) {
            const el = document.querySelector(seletor);
            if (el) el.textContent = valor;
        }
        
        // Barra de XP
        const barraXP = document.querySelector('.xp-barra');
        if (barraXP) {
            const percent = (this.jogador.xp / this.jogador.xpProximoNivel) * 100;
            barraXP.style.width = percent + '%';
            barraXP.setAttribute('data-porcentagem', percent.toFixed(1) + '%');
        }
    }
    
    // ========================================
    // 21. INICIAR SISTEMAS
    // ========================================
    iniciarSistemas() {
        this.iniciarTemporizador();
        this.atualizarInterface();
        
        // Adicionar estilos globais
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .xp-barra {
                transition: width 0.5s ease;
            }
            .glitch {
                animation: glitch 1s infinite;
            }
            @keyframes glitch {
                2%,64% { transform: skew(2deg); }
                4%,60% { transform: skew(-2deg); }
                62% { transform: skew(0deg); }
            }
        `;
        document.head.appendChild(style);
        
        this.log('🚀 Sistema CDD 3001 v3.0 iniciado!', 'sucesso');
    }
}

// ========================================
// 22. INICIALIZAÇÃO GLOBAL
// ========================================
const rpg = new CDDRPG();
window.rpg = rpg;

// ========================================
// 23. ATALHOS DE TECLADO
// ========================================
document.addEventListener('keydown', function(e) {
    // P = Perfil
    if (e.key === 'p' || e.key === 'P') {
        window.location.href = '/cdd/perfil.html';
    }
    
    // I = Inventário
    if (e.key === 'i' || e.key === 'I') {
        window.location.href = '/cdd/inventario/';
    }
    
    // M = Mapa
    if (e.key === 'm' || e.key === 'M') {
        window.location.href = '/cdd/mapa/';
    }
    
    // H = História
    if (e.key === 'h' || e.key === 'H') {
        window.location.href = '/cdd/historia/';
    }
    
    // ESC = Menu
    if (e.key === 'Escape') {
        if (confirm("🎮 Menu do Sistema\n\n1. Salvar agora\n2. Resetar jogo\n3. Voltar")) {
            // Menu será implementado depois
        }
    }
    
    // F12 = Debug
    if (e.key === 'F12') {
        console.log('🐞 Debug Mode', rpg);
        alert(`🐞 Debug Mode\nVersão: ${rpg.versao}\nNível: ${rpg.jogador.nivel}\nXP: ${rpg.jogador.xp}\nMemórias: ${rpg.jogador.recursos.memorias}`);
    }
});

// ========================================
// ATUALIZAÇÃO: BRANQUELOS
// ========================================

// Adicionar Branquelos ao sistema de combate
this.branquelos = {
    nome: "Branquelo",
    nivel: 1,
    xp: 15,
    stats: {
        forca: 6,
        agilidade: 4,
        percepcao: 3
    },
    fraquezas: ["fogo", "luz"],
    descricao: "Recém-transformado, ainda conserva traços humanos"
};

// Atualizar método de combate para incluir Branquelos
this.combaterBranquelo = function() {
    const dano = Math.floor(Math.random() * 10) + this.jogador.atributos.forca;
    const acertou = dano > 3; // Mais fácil de acertar
    
    if (acertou) {
        this.jogador.estatisticas.acertos++;
        this.ganharXP(15, 'derrotou Branquelo');
        this.log('✅ Branquelo derrotado! +15 XP', 'sucesso');
        return true;
    } else {
        this.jogador.estatisticas.erros++;
        this.log('❌ Errou o Branquelo!', 'erro');
        return false;
    }
};

// Atualizar conquistas para incluir Branquelos
this.conquistas.push(
    { id: "c29", nome: "Caçador de Branquelos", desc: "Derrote 10 Branquelos", icon: "👻", xp: 100, categoria: "combate" },
    { id: "c30", nome: "Exterminador de Branquelos", desc: "Derrote 50 Branquelos", icon: "👻", xp: 300, categoria: "combate" }
);

