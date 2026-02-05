// Suavizar rolagem para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Formulário de contato (simulação)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };
        
        // Simular envio (substituir por código real posteriormente)
        console.log('Formulário enviado:', formData);
        
        // Feedback ao usuário
        alert('Obrigado pela mensagem! Em breve entrarei em contato. Enquanto isso, você pode me contatar diretamente pelos links acima.');
        
        // Limpar formulário
        this.reset();
    });
}

// Efeito de aparecimento suave ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Adicionar classe inicial para CSS
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Verificar se há hash na URL e rolar até ele
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});