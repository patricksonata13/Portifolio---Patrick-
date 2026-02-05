#!/bin/bash
echo "Baixando HTML completo..."

# URL de exemplo (substitua por um real se tiver)
# Por enquanto, vamos criar localmente

cat > index-completo.html << 'HTML'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick Sonata</title>
    <style>
        /* Estilos básicos */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        
        /* Header */
        header {
            background: #333;
            color: white;
            padding: 1rem;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }
        
        nav {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            text-decoration: none;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            margin-left: 2rem;
        }
        
        /* Hero Section */
        .hero {
            padding: 150px 0 100px;
            text-align: center;
            background: #f4f4f4;
        }
        
        .profile-img {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .highlight {
            color: #007bff;
        }
        
        /* Portfolio */
        .portfolio {
            padding: 100px 0;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .portfolio-item {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .portfolio-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .portfolio-info {
            padding: 1.5rem;
        }
        
        /* Responsivo */
        @media (max-width: 768px) {
            h1 { font-size: 2rem; }
            .profile-img { width: 200px; height: 200px; }
            .nav-links { display: none; }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <nav>
            <a href="#" class="logo">Patrick Sonata</a>
            <div class="nav-links">
                <a href="#home">Início</a>
                <a href="#portfolio">Portfólio</a>
                <a href="#contact">Contato</a>
            </div>
        </nav>
    </header>

    <!-- Hero -->
    <section id="home" class="hero">
        <img src="assets/images/profile/patrick-home.jpg" 
             alt="Patrick Sonata" 
             class="profile-img">
        <h1>Patrick <span class="highlight">Sonata</span></h1>
        <p>Ator • Comediante • Roteirista</p>
        <p>Carioca cria da Cidade de Deus</p>
    </section>

    <!-- Portfolio -->
    <section id="portfolio" class="portfolio">
        <h2 style="text-align: center; margin-bottom: 2rem;">Portfólio</h2>
        <div class="portfolio-grid">
            
            <!-- Pablo & Luisão -->
            <div class="portfolio-item">
                <img src="assets/images/works/pabloeluisao.jpg" alt="Pablo & Luisão">
                <div class="portfolio-info">
                    <h3>Pablo & Luisão</h3>
                    <p>Série de humor</p>
                </div>
            </div>
            
            <!-- Programa Zorra -->
            <div class="portfolio-item">
                <img src="assets/images/works/programazorra.jpg" alt="Programa Zorra">
                <div class="portfolio-info">
                    <h3>Programa Zorra</h3>
                    <p>TV Globo</p>
                </div>
            </div>
            
            <!-- Cidade Correria -->
            <div class="portfolio-item">
                <img src="assets/images/works/cidadecorreriapeca.jpg" alt="Cidade Correria">
                <div class="portfolio-info">
                    <h3>Cidade Correria</h3>
                    <p>Peça teatral</p>
                </div>
            </div>
            
        </div>
    </section>

    <!-- Footer -->
    <footer style="background: #333; color: white; text-align: center; padding: 2rem;">
        <p>&copy; 2024 Patrick Sonata</p>
        <p>patricksonata.com.br</p>
    </footer>

    <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
HTML

echo "✅ HTML criado como index-completo.html"
echo "Para usar: mv index-completo.html index.html"
