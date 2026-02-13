// ========================================
// AIRTABLE - CONECTOR DE PROJETOS
// ========================================
async function carregarProjetosDoAirtable() {
    const config = window.AIRTABLE_CONFIG;
    if (!config || !config.API_KEY || !config.BASE_ID) {
        console.log('⚠️ Airtable não configurado');
        return;
    }

    try {
        const resposta = await fetch(
            `https://api.airtable.com/v0/${config.BASE_ID}/Projetos`,
            {
                headers: {
                    'Authorization': `Bearer ${config.API_KEY}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error('Erro na resposta da API');
        }

        const dados = await resposta.json();
        
        // Encontra o grid do portfólio
        const grid = document.querySelector('.portfolio-grid');
        if (!grid || !dados.records) return;

        // Renderiza os projetos
        grid.innerHTML = dados.records.map(record => {
            const campos = record.fields;
            const imagemUrl = campos.Imagem && campos.Imagem[0] 
                ? campos.Imagem[0].url 
                : 'assets/images/works/placeholder.jpg';

            return `
                <div class="portfolio-card">
                    <img src="${imagemUrl}" alt="${campos.Nome || 'Projeto'}" 
                         onerror="this.src='assets/images/works/placeholder.jpg'">
                    <div class="portfolio-info">
                        <h3>${campos.Nome || 'Sem título'}</h3>
                        <div class="portfolio-role">${campos.Categoria || 'Projeto'}</div>
                        <p>${campos.Descricao || ''}</p>
                    </div>
                </div>
            `;
        }).join('');

        console.log('✅ Projetos carregados do Airtable');
    } catch (erro) {
        console.error('❌ Erro ao carregar projetos:', erro);
    }
}

// Carrega quando a página estiver pronta
document.addEventListener('DOMContentLoaded', carregarProjetosDoAirtable);
