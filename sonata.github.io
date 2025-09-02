<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick Sonata - Portfólio Artístico</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        :root {
            --primary-color: #ff6b6b;
            --secondary-color: #4ecdc4;
            --accent-color: #ffd166;
            --bg-color: #1a1a2e;
            --light-bg: #16213e;
            --card-bg: #0f3460;
            --text-color: #fff;
            --text-light: rgba(255, 255, 255, 0.8);
        }
        
        body {
            background: var(--bg-color);
            color: var(--text-color);
            line-height: 1.7;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header e Navegação */
        header {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(15px);
            padding: 15px 0;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        header.scrolled {
            padding: 10px 0;
            background: rgba(15, 15, 35, 0.98);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary-color);
            text-decoration: none;
            display: flex;
            align-items: center;
        }
        
        .logo span {
            color: var(--secondary-color);
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-link {
            color: var(--text-light);
            text-decoration: none;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .nav-link i {
            font-size: 1.2rem;
            margin-bottom: 5px;
        }
        
        .nav-link:hover, .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        .nav-link:hover::after, .nav-link.active::after {
            width: 100%;
        }
        
        .nav-link span {
            font-size: 0.85rem;
        }
        
        /* Hero Section */
        .hero {
            min-height: 80vh;
            display: flex;
            align-items: center;
            padding-top: 60px;
            background: linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9));
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80') no-repeat center center/cover;
            opacity: 0.15;
            z-index: -1;
        }

        .hero-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px 0;
        }

        .profile-img-container {
            margin: 0 auto 15px;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid var(--primary-color);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            background: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-light);
        }

        .hero-title {
            font-size: 3rem;
            margin-bottom: 10px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
            font-size: 1.3rem;
            color: var(--text-light);
            margin-bottom: 10px;
        }

        .hero-description {
            font-size: 1rem;
            color: var(--text-light);
            margin-bottom: 25px;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .profile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* About Section */
        .about {
            padding: 100px 0;
            background: var(--light-bg);
        }
        
        .about-content {
            display: flex;
            align-items: center;
            gap: 50px;
        }
        
        .about-text {
            flex: 1;
        }
        
        .about-title {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: var(--primary-color);
        }
        
        .about-desc {
            color: var(--text-light);
            margin-bottom: 25px;
            line-height: 1.8;
        }
        
        .about-highlights {
            margin-top: 30px;
        }
        
        .highlight-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .highlight-icon {
            width: 40px;
            height: 40px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        /* Portfolio Section */
        .portfolio {
            padding: 100px 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 60px;
            font-size: 2.5rem;
            color: var(--primary-color);
            position: relative;
            padding-bottom: 15px;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: var(--secondary-color);
        }
        
        .portfolio-filters {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 40px;
        }
        
        .filter-btn {
            padding: 8px 20px;
            background: var(--light-bg);
            color: var(--text-light);
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover, .filter-btn.active {
            background: var(--primary-color);
            color: #fff;
        }
        
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
        }
        
        .portfolio-item {
            background: var(--card-bg);
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
        }
        
        .portfolio-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
        
        .portfolio-img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            display: block;
        }
        
        .portfolio-info {
            padding: 25px;
        }
        
        .portfolio-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .portfolio-subtitle {
            font-size: 1rem;
            color: var(--secondary-color);
            margin-bottom: 15px;
            font-style: italic;
        }
        
        .portfolio-details {
            background: rgba(0, 0, 0, 0.2);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .detail-item {
            margin-bottom: 8px;
            display: flex;
        }
        
        .detail-label {
            font-weight: 600;
            color: var(--secondary-color);
            min-width: 100px;
        }
        
        .detail-content {
            color: var(--text-light);
            flex: 1;
        }
        
        .portfolio-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        .portfolio-tag {
            background: var(--light-bg);
            color: var(--secondary-color);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
        }
        
        .portfolio-link {
            display: inline-block;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            cursor: pointer;
        }
        
        .portfolio-link::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        .portfolio-link:hover::after {
            width: 100%;
        }
        
        /* Footer */
        footer {
            background: var(--light-bg);
            padding: 60px 0 30px;
            text-align: center;
        }
        
        .footer-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--card-bg);
            color: var(--primary-color);
            font-size: 1.2rem;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background: var(--primary-color);
            color: #fff;
            transform: translateY(-5px);
        }
        
        .copyright {
            color: var(--text-light);
            font-size: 0.9rem;
            margin-top: 20px;
        }
        
        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            overflow-y: auto;
            padding: 50px 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal.active {
            display: block;
            opacity: 1;
        }
        
        .modal-content {
            background: var(--card-bg);
            max-width: 900px;
            margin: 0 auto;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            transform: translateY(50px);
            transition: transform 0.5s ease;
        }
        
        .modal.active .modal-content {
            transform: translateY(0);
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
            background: var(--primary-color);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            transform: rotate(90deg);
            background: var(--secondary-color);
        }
        
        .modal-img {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        
        .modal-info {
            padding: 30px;
        }
        
        .modal-title {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .modal-subtitle {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin-bottom: 20px;
        }
        
        /* Botão do WhatsApp */
        .floating-contact {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 1000;
        }
        
        .whatsapp-float {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-size: 30px;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.7);
        }
        
        /* Loading animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Responsividade */
        @media screen and (max-width: 768px) {
            .nav-menu {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(15px);
                padding: 15px 0;
                justify-content: space-around;
                gap: 0;
            }
            
            .nav-link span {
                display: none;
            }
            
            .hero-title {
                font-size: 2.5rem;
            }
            
            .hero-subtitle {
                font-size: 1.2rem;
            }
            
            .profile-img-container {
                width: 150px;
                height: 150px;
            }
            
            .portfolio-grid {
                grid-template-columns: 1fr;
            }
            
            .modal-img {
                height: 250px;
            }
            
            .about-content {
                flex-direction: column;
            }
        }
        
        @media screen and (max-width: 480px) {
            .logo {
                font-size: 1.5rem;
            }
            
            .hero-title {
                font-size: 2rem;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .profile-img-container {
                width: 120px;
                height: 120px;
            }
            
            .portfolio-info {
                padding: 15px;
            }
            
            .portfolio-title {
                font-size: 1.3rem;
            }
            
            .detail-item {
                flex-direction: column;
                margin-bottom: 15px;
            }
            
            .detail-label {
                margin-bottom: 5px;
            }
            
            .modal-info {
                padding: 20px;
            }
            
            .modal-title {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Cabeçalho com navegação -->
    <header>
        <div class="container">
            <nav>
                <a href="#" class="logo">Patrick <span>Sonata</span></a>
                <ul class="nav-menu">
                    <li><a href="#home" class="nav-link active"><i class="fas fa-home"></i> <span>Início</span></a></li>
                    <li><a href="#portfolio" class="nav-link"><i class="fas fa-briefcase"></i> <span>Portfólio</span></a></li>
                    <li><a href="#about" class="nav-link"><i class="fas fa-user"></i> <span>Sobre</span></a></li>
                    <li><a href="#contact" class="nav-link"><i class="fas fa-envelope"></i> <span>Contato</span></a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section com foto de perfil -->
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="profile-img-container">
                    <!-- Imagem substituída por inicial e fundo colorido -->
                    <div style="width: 100%; height: 100%; background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)); display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: bold;">
                        PS
                    </div>
                </div>
                <h1 class="hero-title">Patrick Sonata</h1>
                <p class="hero-subtitle">Portfólio de Trabalhos Artísticos</p>
                <p class="hero-description">Esta é uma coleção dos meus trabalhos artísticos e projetos criativos. Cada item representa uma colaboração única e especial no mundo das artes.</p>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">Sobre Mim</h2>
            <div class="about-content">
                <div class="about-text">
                    <p class="about-desc">Sou um artista multifacetado com experiência em televisão, teatro, comédia e cinema. Minha paixão pela arte me levou a trabalhar em diversos projetos, desde programas de TV até espetáculos teatrais, sempre buscando inovar e trazer perspectivas únicas para cada trabalho.</p>
                    <p class="about-desc">Com formação em [adicione sua formação] e [X anos] de experiência no mercado artístico, tenho me dedicado a criar conteúdo que emociona, diverte e provoca reflexão.</p>
                    
                    <div class="about-highlights">
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-tv"></i>
                            </div>
                            <div>
                                <h3>Televisão</h3>
                                <p>Experiência em programas de humor e séries</p>
                            </div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-theater-masks"></i>
                            </div>
                            <div>
                                <h3>Teatro</h3>
                                <p>Dramaturgia e atuação em espetáculos</p>
                            </div>
                        </div>
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="fas fa-microphone"></i>
                            </div>
                            <div>
                                <h3>Comédia</h3>
                                <p>Stand-up e shows de humor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="portfolio">
        <div class="container">
            <h2 class="section-title">Meus Trabalhos</h2>
            
            <div class="portfolio-filters">
                <button class="filter-btn active" data-filter="all">Todos</button>
                <button class="filter-btn" data-filter="tv">Televisão</button>
                <button class="filter-btn" data-filter="theater">Teatro</button>
                <button class="filter-btn" data-filter="comedy">Humor</button>
                <button class="filter-btn" data-filter="film">Cinema</button>
            </div>
            
            <div class="portfolio-grid">
                <!-- Série Pablo & Luisão -->
                <div class="portfolio-item" data-category="tv">
                    <img src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80" alt="Série Pablo & Luisão" class="portfolio-img">
                    <div class="portfolio-info">
                        <h3 class="portfolio-title">Série Pablo & Luisão</h3>
                        <p class="portfolio-subtitle">(2025)</p>
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <span class="detail-label">Autores:</span>
                                <span class="detail-content">Paulo Vieira, Maurício Rizzo</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Direção:</span>
                                <span class="detail-content">João Gomez</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Direção Artística:</span>
                                <span class="detail-content">Luis Felipe Sá</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Roteiro:</span>
                                <span class="detail-content">Bia Braune, Caíto Mainier, Nathalia Cruz e Patrick Sonata</span>
                            </div>
                        </div>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">Série</span>
                            <span class="portfolio-tag">Comédia</span>
                            <span class="portfolio-tag">Televisão</span>
                        </div>
                        <a class="portfolio-link view-details" data-item="1">Ver detalhes →</a>
                    </div>
                </div>
                
                <!-- Programa Zorra -->
                <div class="portfolio-item" data-category="tv comedy">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHR2JTIwc2hvd3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Captura de tela do Programa Zorra da TV Globo" class="portfolio-img">
                    <div class="portfolio-info">
                        <h3 class="portfolio-title">Programa Zorra</h3>
                        <p class="portfolio-subtitle">(2019-2021)</p>
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <span class="detail-label">Redação Final:</span>
                                <span class="detail-content">Marcius Melhem, Celso Taddei, Gabriela Amaral, Nelito Fernandes e Marta Mendonça</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Direção Geral:</span>
                                <span class="detail-content">Mauro Farias</span>
                            </div>
                        </div>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">TV</span>
                            <span class="portfolio-tag">Humor</span>
                            <span class="portfolio-tag">Programa</span>
                        </div>
                        <a class="portfolio-link view-details" data-item="2">Ver detalhes →</a>
                    </div>
                </div>
                
                <!-- Espetáculo Pelada -->
                <div class="portfolio-item" data-category="theater">
                    <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRoZWF0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80" alt="Espetáculo teatral Pelada" class="portfolio-img">
                    <div class="portfolio-info">
                        <h3 class="portfolio-title">Espetáculo Pelada - A Hora da Gaymada</h3>
                        <p class="portfolio-subtitle">(2022)</p>
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <span class="detail-label">Direção:</span>
                                <span class="detail-content">Orlando Caldeira</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Roteiro e Dramaturgia:</span>
                                <span class="detail-content">Patrick Sonata</span>
                            </div>
                        </div>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">Teatro</span>
                            <span class="portfolio-tag">Espetáculo</span>
                            <span class="portfolio-tag">Comédia</span>
                        </div>
                        <a class="portfolio-link view-details" data-item="3">Ver detalhes →</a>
                    </div>
                </div>
                
                <!-- Show de Humor -->
                <div class="portfolio-item" data-category="comedy">
                    <img src="https://images.unsplash.com/photo-1548217395-6c6095abb49c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RhbmQlMjB1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Show de Humor" class="portfolio-img">
                    <div class="portfolio-info">
                        <h3 class="portfolio-title">Show de Humor "Pra provar que eu não minto"</h3>
                        <p class="portfolio-subtitle">(2023)</p>
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <span class="detail-label">Direção:</span>
                                <span class="detail-content">Paulo Costa</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Roteiro:</span>
                                <span class="detail-content">Patrick Sonata e Tamires Gomes</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Elenco:</span>
                                <span class="detail-content">Dawis Jamaica</span>
                            </div>
                        </div>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">Humor</span>
                            <span class="portfolio-tag">Stand-up</span>
                            <span class="portfolio-tag">Show</span>
                        </div>
                        <a class="portfolio-link view-details" data-item="4">Ver detalhes →</a>
                    </div>
                </div>
                
                <!-- Documentário Cidade Correria -->
                <div class="portfolio-item" data-category="film">
                    <img src="https://images.unsplash.com/photo-1543857778-c4a1a569e0bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3VtZW50YXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80" alt="Documentário Cidade Correria" class="portfolio-img">
                    <div class="portfolio-info">
                        <h3 class="portfolio-title">Documentário "Cidade Correria"</h3>
                        <p class="portfolio-subtitle">(2022)</p>
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <span class="detail-label">Direção:</span>
                                <span class="detail-content">Juliana Vicente e Washington Deoli</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Roteiro:</span>
                                <span class="detail-content">Juliana Vicente</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Realização:</span>
                                <span class="detail-content">Prêt-à-porter Filmes</span>
                            </div>
                        </div>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">Documentário</span>
                            <span class="portfolio-tag">Cinema</span>
                            <span class="portfolio-tag">Arte</span>
                        </div>
                        <a class="portfolio-link view-details" data-item="5">Ver detalhes →</a>
                    </div>
                </div>
                
                <!-- Série Humor Negro -->
                <div class="portfolio-item" data-category="tv comedy">
                    <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN0cmVhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Série Humor Negro" class="portfolio-img">
                    <div class="portfolio-info">
                        <h3 class="portfolio-title">Série de Comédia "Humor Negro"</h3>
                        <p class="portfolio-subtitle">(2023) - T1 EP: May Sista, Meus Brother</p>
                        <div class="portfolio-details">
                            <div class="detail-item">
                                <span class="detail-label">Direção:</span>
                                <span class="detail-content">Rodrigo França</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Criação:</span>
                                <span class="detail-content">Val Benvindo</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Roteiro:</span>
                                <span class="detail-content">Renata Di Carmo</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Plataforma:</span>
                                <span class="detail-content">Globoplay</span>
                            </div>
                        </div>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">Série</span>
                            <span class="portfolio-tag">Humor</span>
                            <span class="portfolio-tag">Streaming</span>
                        </div>
                        <a class="portfolio-link view-details" data-item="6">Ver detalhes →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/patrick-sonata-7b4b2a241/" target="_blank" class="social-link">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/PatrickSonata13" target="_blank" class="social-link">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://www.instagram.com/patrick_sonata/" target="_blank" class="social-link">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                
                <p class="copyright">© 2023 Patrick Sonata - Todos os direitos reservados</p>
                <p class="copyright">Portfólio criado para GitHub Pages</p>
            </div>
        </div>
    </footer>

    <!-- Modal de detalhes -->
    <div class="modal" id="project-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Project Image" class="modal-img" id="modal-img">
            <div class="modal-info">
                <h2 class="modal-title" id="modal-title"></h2>
                <p class="modal-subtitle" id="modal-subtitle"></p>
                <div id="modal-details"></div>
                <div id="modal-tags" class="portfolio-tags"></div>
            </div>
        </div>
    </div>

    <!-- Botão flutuante de contato -->
    <div class="floating-contact">
        <a href="https://wa.me/5521983976299" target="_blank" class="whatsapp-float">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <script>
        // Dados dos projetos para o modal
        const projects = {
            1: {
                title: "Série Pablo & Luisão",
                subtitle: "(2025)",
                image: "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80",
                details: `
                    <div class="detail-item">
                        <span class="detail-label">Autores:</span>
                        <span class="detail-content">Paulo Vieira, Maurício Rizzo</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Direção:</span>
                        <span class="detail-content">João Gomez</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Direção Artística:</span>
                        <span class="detail-content">Luis Felipe Sá</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Roteiro:</span>
                        <span class="detail-content">Bia Braune, Caíto Mainier, Nathalia Cruz e Patrick Sonata</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descrição:</span>
                        <span class="detail-content">Uma série de comédia que acompanha as aventuras de Pablo e Luisão, dois amigos com personalidades completamente diferentes que se metem em situações hilárias no seu dia a dia.</span>
                    </div>
                `,
                tags: ['Série', 'Comédia', 'Televisão']
            },
            2: {
                title: "Programa Zorra",
                subtitle: "(2019-2021)",
                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHR2JTIwc2hvd3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=80",
                details: `
                    <div class="detail-item">
                        <span class="detail-label">Redação Final:</span>
                        <span class="detail-content">Marcius Melhem, Celso Taddei, Gabriela Amaral, Nelito Fernandes e Marta Mendonça</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Direção Geral:</span>
                        <span class="detail-content">Mauro Farias</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descrição:</span>
                        <span class="detail-content">Programa de humor da TV Globo que mescla esquetes, paródias musicais e quadros de comédia, com participação de diversos humoristas e celebridades.</span>
                    </div>
                `,
                tags: ['TV', 'Humor', 'Programa']
            },
            3: {
                title: "Espetáculo Pelada - A Hora da Gaymada",
                subtitle: "(2022)",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRoZWF0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80",
                details: `
                    <div class="detail-item">
                        <span class="detail-label">Direção:</span>
                        <span class="detail-content">Orlando Caldeira</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Roteiro e Dramaturgia:</span>
                        <span class="detail-content">Patrick Sonata</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descrição:</span>
                        <span class="detail-content">Espetáculo teatral que aborda questões LGBTQ+ com humor e sensibilidade, explorando temas como identidade, aceitação e amor através de situações cômicas e emocionantes.</span>
                    </div>
                `,
                tags: ['Teatro', 'Espetáculo', 'Comédia']
            }
        };

        // Script para destacar a aba ativa durante a rolagem
        document.addEventListener('DOMContentLoaded', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            const header = document.querySelector('header');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            const modal = document.getElementById('project-modal');
            const closeModalBtn = document.querySelector('.close-modal');
            const viewDetailsBtns = document.querySelectorAll('.view-details');
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Active nav link
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
            
            // Suavizar a rolagem ao clicar nos links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Filtros do portfólio
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remover classe active de todos os botões
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Adicionar classe active ao botão clicado
                    this.classList.add('active');
                    
                    // Obter o filtro
                    const filter = this.getAttribute('data-filter');
                    
                    // Filtrar itens
                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
            
            // Abrir modal
            viewDetailsBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item');
                    const project = projects[itemId];
                    
                    if (project) {
                        document.getElementById('modal-title').textContent = project.title;
                        document.getElementById('modal-subtitle').textContent = project.subtitle;
                        document.getElementById('modal-img').src = project.image;
                        document.getElementById('modal-details').innerHTML = project.details;
                        
                        // Limpar e adicionar tags
                        const tagsContainer = document.getElementById('modal-tags');
                        tagsContainer.innerHTML = '';
                        project.tags.forEach(tag => {
                            const tagElement = document.createElement('span');
                            tagElement.classList.add('portfolio-tag');
                            tagElement.textContent = tag;
                            tagsContainer.appendChild(tagElement);
                        });
                        
                        // Mostrar modal
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            // Fechar modal
            closeModalBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Fechar modal clicando fora
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    </script>
</body>
</html>
