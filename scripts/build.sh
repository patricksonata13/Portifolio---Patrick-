#!/bin/bash
# Build otimizado para produção

echo "🚀 Iniciando build..."

# Criar pasta dist
mkdir -p dist/assets/{css,js,images}

# Concatenar CSS
cat src/assets/css/main.css > dist/assets/css/style.css
cat src/assets/css/components.css >> dist/assets/css/style.css
cat src/assets/css/draft.css >> dist/assets/css/style.css
cat src/assets/css/responsive.css >> dist/assets/css/style.css

# Concatenar JS
cat src/assets/js/database.js > dist/assets/js/script.js
cat src/assets/js/ui.js >> dist/assets/js/script.js
cat src/assets/js/portfolio.js >> dist/assets/js/script.js
cat src/assets/js/main.js >> dist/assets/js/script.js
cat src/assets/js/airtable-loader.js >> dist/assets/js/script.js

# Copiar HTML
cp src/pages/home/index.html dist/index.html
cp -r src/pages/cdd dist/ 2>/dev/null
cp -r src/pages/patika dist/ 2>/dev/null
cp -r src/pages/aulas dist/ 2>/dev/null
cp -r src/pages/contato dist/ 2>/dev/null

# Copiar assets
cp -r src/assets/images dist/assets/ 2>/dev/null
cp sitemap.xml dist/ 2>/dev/null
cp robots.txt dist/ 2>/dev/null
cp manifest.json dist/ 2>/dev/null
cp google*.html dist/ 2>/dev/null

echo "✅ Build concluído em dist/"
