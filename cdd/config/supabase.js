import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://uhchpjdkuogdspkzujua.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_7jGY1vUGLgdvoSqy6I9e6g_zl-Wn1Vn'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function salvarJogador(jogador) {
    try {
        const { data, error } = await supabase
            .from('jogadores')
            .upsert({
                id: jogador.id || localStorage.getItem('cdd_user_id') || crypto.randomUUID(),
                nome: 'Arquivista',
                nivel: jogador.nivel || 1,
                xp: jogador.xp || 0,
                memorias: jogador.memorias || 0,
                moedas: jogador.moedas || 0,
                atributos: jogador.atributos || {},
                inventario: jogador.inventario || {},
                itens: jogador.itens || [],
                conquistas: jogador.conquistas || [],
                visitas: jogador.visitas || [],
                segredos: jogador.segredos || [],
                estatisticas: jogador.estatisticas || {},
                ultimo_save: new Date()
            })
        
        if (error) throw error
        console.log('✅ Jogo salvo na nuvem!')
        return data
    } catch (error) {
        console.error('❌ Erro ao salvar:', error.message)
    }
}

export async function getRanking() {
    try {
        const { data, error } = await supabase
            .from('ranking')
            .select('*')
            .limit(20)
        
        if (error) throw error
        return data
    } catch (error) {
        console.error('❌ Erro ao buscar ranking:', error.message)
        return []
    }
}
