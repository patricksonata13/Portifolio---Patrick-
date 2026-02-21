// Cliente Supabase para o navegador
const SUPABASE_URL = 'https://uhchpjdkuogdspkzujua.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_7jGY1vUGLgdvoSqy6I9e6g_zl-Wn1Vn'

const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

window.SupabaseGame = {
    async salvar(jogador) {
        try {
            let userId = localStorage.getItem('cdd_user_id')
            if (!userId) {
                userId = crypto.randomUUID()
                localStorage.setItem('cdd_user_id', userId)
            }

            const { data } = await supabase
                .from('jogadores')
                .upsert({
                    id: userId,
                    nome: 'Arquivista',
                    nivel: jogador.nivel,
                    xp: jogador.xp,
                    memorias: jogador.memorias,
                    moedas: jogador.moedas,
                    atributos: jogador.atributos,
                    inventario: jogador.inventario,
                    itens: jogador.itens,
                    conquistas: jogador.conquistas,
                    visitas: jogador.visitas,
                    segredos: jogador.segredos,
                    estatisticas: jogador.estatisticas,
                    ultimo_save: new Date()
                })
            
            console.log('✅ Sincronizado com nuvem!')
            return data
        } catch (e) {
            console.log('❌ Falha ao sincronizar:', e.message)
        }
    },

    async ranking() {
        const { data } = await supabase
            .from('ranking')
            .select('*')
            .limit(10)
        return data
    },

    async eventos() {
        const { data } = await supabase
            .from('eventos')
            .select('*')
            .eq('ativo', true)
        return data
    }
}
