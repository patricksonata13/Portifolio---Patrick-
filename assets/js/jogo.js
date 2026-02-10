const db_afro = {
    'MÃE JUREMA': "MÃE JUREMA: 'O mundo morreu lá fora, mas aqui a gente reinventou a vida. E reinventar dói.'",
    'CAPITÃO RAFA': "CAPITÃO RAFA: 'Treino todos acima de 12 anos. Se a Neocorp vier, vai sangrar no asfalto.'",
    'DRA LÍVIA': "DRA LÍVIA: 'Antibiótico de mofo e oração. Na CDD, a cura é um ato político.'",
    'ORIXÁ-TEC': "KAYODÊ: 'Não é chip, é axé. Eu falo com as máquinas porque elas lembram de quem as construiu.'",
    'BARÕES': "INFO: Barões da Chuva. Controlam a água. Gananciosos, mas necessários para o comércio.",
    'HELP': "SISTEMA: Digite o nome de um personagem ou facção para interceptar mensagens."
};

function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    if(!out) return;
    
    let inputUpper = cmd.toUpperCase().trim();
    let p = document.createElement('p');
    p.style.cssText = "margin:8px 0; border-left:2px solid #ffae00; padding-left:8px; color:#fff;";

    if (db_afro[inputUpper]) {
        p.innerHTML = `<span style="color:#ffae00">> TRANSMISSÃO:</span> ${db_afro[inputUpper]}`;
    } else {
        p.innerHTML = `<span style="color:#ff4444">> ERRO:</span> Identidade não encontrada na rede Sankofa.`;
    }
    
    out.appendChild(p);
    const term = document.getElementById('sin-terminal');
    if(term) term.scrollTop = term.scrollHeight;
}

// Observador de segurança: Só age se o terminal aparecer na tela
const observer = new MutationObserver(() => {
    const out = document.getElementById('log-output');
    if (out && !document.getElementById('missao-ativa')) {
        setTimeout(() => {
            let m = document.createElement('p');
            m.id = 'missao-ativa';
            m.style.cssText = "color:#ff4444; font-weight:bold; animation:blink 1s infinite;";
            m.innerHTML = `⚠️ [ALERTA]: Mãe Jurema solicita sua presença. Tropas detectadas.`;
            out.appendChild(m);
        }, 1000);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Teclado
document.addEventListener('keydown', function(e) {
    if (e.target.id === 'game-input' && e.key === 'Enter') {
        processarJogo(e.target.value);
        e.target.value = '';
    }
});

// Estilo de animação isolado
if (!document.getElementById('cdd-style')) {
    const s = document.createElement('style');
    s.id = 'cdd-style';
    s.innerHTML = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`;
    document.head.appendChild(s);
}
