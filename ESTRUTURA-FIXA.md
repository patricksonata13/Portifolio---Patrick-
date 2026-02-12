# 🏛️ ESTRUTURA FIXA DO SITE - PATRICK SONATA
**Última atualização: 12/02/2026**
**Esta estrutura NÃO PODE SER ALTERADA**

---

## 📌 AS 6 ABAS FIXAS DO SITE

### 🎯 GRUPO 1 - SUPERIOR DIREITA (NOVAS PÁGINAS)
| # | Aba | Tipo | Link | Obrigatório |
|---|-----|------|------|-------------|
| 1 | **CDD 3001** | Página própria | `/cdd/index.html` | ✅ SEMPRE |
| 2 | **PATIKA** | Página própria | `/patika/index.html` | ✅ SEMPRE (VERDE) |
| 3 | **AULAS** | Página própria | `/aulas/index.html` | ✅ SEMPRE |

### 🎯 GRUPO 2 - INFERIOR CENTRAL (AÇÕES NA PÁGINA)
| # | Aba | Tipo | Ação | Obrigatório |
|---|-----|------|------|-------------|
| 4 | **SOBRE** | Âncora | `#sobre-anchor` | ✅ SEMPRE |
| 5 | **PERFIL** | Âncora | `#perfil-anchor` | ✅ SEMPRE |
| 6 | **TRABALHO** | Painel | `openTab('trabalho')` | ✅ SEMPRE |

---

## 🏗️ INDEX.HTML - TEMPLATE FIXO (NUNCA MUDAR)

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick Sonata | Roteirista</title>
    <link rel="stylesheet" href="assets/css/style.css">
    
    <!-- Umami Analytics - NÃO REMOVER -->
    <script defer src="https://cloud.umami.is/script.js" data-website-id="2b5fdca4-c018-4b7d-941a-b09b6b8b8b43"></script>
</head>
<body>
    <!-- ========================================= -->
    <!-- GRUPO 1: SUPERIOR DIREITA (3 ABAS)       -->
    <!-- CDD 3001 | PATIKA | AULAS - FIXO        -->
    <!-- ========================================= -->
    <div class="main-container" id="home">
        <nav class="nav-top-right">
            <button onclick="window.location.href='cdd/index.html'">CDD 3001</button>
            <button onclick="window.location.href='patika/index.html'" class="patika-btn">PATIKA</button>
            <button onclick="window.location.href='aulas/index.html'">AULAS</button>
        </nav>

        <!-- FOTO E NOME CENTRAL - FIXO -->
        <img src="assets/images/fotodeperfil.jpg" alt="Patrick Sonata" class="profile-img">
        <h1>PATRICK SONATA</h1>
        
        <!-- ========================================= -->
        <!-- GRUPO 2: INFERIOR CENTRAL (3 ABAS)       -->
        <!-- SOBRE | PERFIL | TRABALHO - FIXO        -->
        <!-- ========================================= -->
        <div class="nav-bottom-center">
            <a href="#sobre-anchor"><button>Sobre</button></a>
            <a href="#perfil-anchor"><button>Perfil</button></a>
            <button onclick="openTab('trabalho')">Trabalho</button>
        </div>
    </div>
    
    <!-- ========================================= -->
    <!-- CONTEÚDO DAS ÂNCORAS - FIXO             -->
    <!-- SOBRE e PERFIL - NÃO REMOVER            -->
    <!-- ========================================= -->
    <div id="sobre-anchor"></div>
    <section class="script-page">
        <div class="script-content" id="content-sobre"></div>
    </section>
    
    <div id="perfil-anchor"></div>
    <section class="script-page"> 
        <div class="script-content" id="content-perfil"></div>
    </section>
    
    <!-- ========================================= -->
    <!-- PAINEL LATERAL - FIXO                   -->
    <!-- TRABALHO → PORTFÓLIO (grade 3x3)        -->
    <!-- ========================================= -->
    <div id="side-panel" class="side-panel">
        <div class="close-btn" onclick="closeTab()">FECHAR [X]</div>
        <h2 id="tab-title" class="content-title"></h2>
        <div id="carousel-container" class="carousel-wrapper" style="display:none;">
            <div class="carousel-track" id="carousel-track"></div>
            <div class="carousel-nav">
                <button onclick="moveCarousel(-1)">❮</button>
                <button onclick="moveCarousel(1)">❯</button> 
            </div>
        </div>
        <div id="tab-text" class="content-text"></div>
    </div>
    
    <!-- SCRIPTS OBRIGATÓRIOS - NÃO REMOVER -->
    <script src="assets/js/database.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
