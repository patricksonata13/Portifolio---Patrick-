// ========================================
// AIRTABLE - CARREGADOR SIMPLES
// ========================================
(function() {
    console.log('🔍 Iniciando carregamento do Airtable...');
    
    // COLE SUA CHAVE AQUI (substitua pela sua)
    const API_KEY = "pat6YwiDlLsOmEEfl.3f66193f5344f7ed173e5172132ebbc7219ce690b2c9dbcda07ed319d548b04a"; // Substitua pela sua chave
    const BASE_ID = 'app1lUWbmq98n18cA';
    
    fetch(`https://api.airtable.com/v0/${BASE_ID}/Projetos`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Projetos carregados:', data);
        window.projetosAirtable = data.records;
    })
    .catch(error => console.error('❌ Erro:', error));
})();
