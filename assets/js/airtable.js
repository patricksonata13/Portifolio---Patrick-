// Airtable - Banco de dados gratuito
// 1. Crie sua base em https://airtable.com
// 2. Pegue sua API Key e Base ID
// 3. Substitua abaixo

const AIRTABLE_API_KEY = 'SUA_CHAVE_AQUI';
const AIRTABLE_BASE_ID = 'SEU_BASE_ID';

async function carregarProjetos() {
    try {
        const resposta = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Projetos`,
            { headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } }
        );
        const dados = await resposta.json();
        
        const grid = document.querySelector('.portfolio-grid');
        if (grid && dados.records) {
            grid.innerHTML = dados.records.map(record => `
                <div class="portfolio-card">
                    <img src="${record.fields.Imagem?.[0]?.url || 'assets/images/works/placeholder.jpg'}" 
                         alt="${record.fields.Nome}">
                    <div class="portfolio-info">
                        <h3>${record.fields.Nome}</h3>
                        <div class="portfolio-role">${record.fields.Categoria || 'Roteirista'}</div>
                        <p>${record.fields.Descricao || ''}</p>
                    </div>
                </div>
            `).join('');
        }
    } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
    }
}

// Carregar quando a página estiver pronta
document.addEventListener('DOMContentLoaded', carregarProjetos);
