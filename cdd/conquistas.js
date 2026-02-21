// Sistema de Conquistas Avançado
window.Conquistas = {
    lista: [
        { id: 'primeiro_passos', nome: 'Primeiros Passos', desc: 'Complete o tutorial', icone: '👣', xp: 50 },
        { id: 'cacador_brancos', nome: 'Caçador de Brancos', desc: 'Derrote 10 inimigos', icone: '⚔️', xp: 100 },
        { id: 'colecionador', nome: 'Colecionador', desc: 'Colete 50 memórias', icone: '📚', xp: 200 },
        { id: 'explorador', nome: 'Explorador da CDD', desc: 'Visite todos os locais', icone: '🗺️', xp: 150 },
        { id: 'artesao', nome: 'Mestre Artesão', desc: 'Crafte 20 itens', icone: '🔨', xp: 250 },
        { id: 'sobrevivente', nome: 'Sobrevivente', desc: 'Sobreviva 30 dias no jogo', icone: '🏃', xp: 300 },
        { id: 'alfa', nome: 'Caçador de Alfa', desc: 'Derrote um Alfa', icone: '💀', xp: 500 },
        { id: 'arquivista_mestre', nome: 'Arquivista Mestre', desc: 'Complete todas as histórias', icone: '👑', xp: 1000 },
    ],

    async verificar(jogador) {
        const novas = []
        
        // Verificar cada conquista
        if (jogador.visitas?.length >= 10 && !jogador.conquistas.includes('explorador')) {
            novas.push('explorador')
        }
        
        if (jogador.estatisticas?.inimigosDerrotados >= 10 && !jogador.conquistas.includes('cacador_brancos')) {
            novas.push('cacador_brancos')
        }
        
        if (jogador.memorias >= 50 && !jogador.conquistas.includes('colecionador')) {
            novas.push('colecionador')
        }
        
        if (jogador.estatisticas?.crafts >= 20 && !jogador.conquistas.includes('artesao')) {
            novas.push('artesao')
        }
        
        // Salvar novas conquistas
        if (novas.length > 0) {
            const { data } = await supabase
                .from('jogadores')
                .update({ conquistas: [...jogador.conquistas, ...novas] })
                .eq('id', jogador.id)
            
            // Notificar
            novas.forEach(c => {
                const info = this.lista.find(l => l.id === c)
                if (info) {
                    alert(`🏆 CONQUISTA: ${info.icone} ${info.nome}\n${info.desc}\n+${info.xp} XP`)
                }
            })
        }
    }
}
