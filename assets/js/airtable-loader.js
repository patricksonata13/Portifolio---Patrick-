// ========================================
// AIRTABLE - CARREGADOR DIRETO
// ========================================
(async function() {
    console.log('🔍 Carregando projetos...');
    
    const API_KEY = 'pat6YwiDlLsOmEEfl.3f66193f5344f7ed173e5172132ebbc7219ce690b2c9dbcda07ed319d548b04a';
    const BASE_ID = 'app1lUWbmq98n18cA';
    
    try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Projetos`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        const data = await response.json();
        console.log('✅ Projetos carregados:', data);
        window.projetosAirtable = data.records;
    } catch (error) {
        console.error('❌ Erro:', error);
    }
})();
