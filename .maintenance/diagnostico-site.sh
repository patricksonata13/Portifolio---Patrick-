#!/bin/bash
echo "🔍 DIAGNÓSTICO DO SITE"
echo "======================"

# 1. Verificar estrutura básica
echo ""
echo "📁 ESTRUTURA DE ARQUIVOS:"
[ -f "index.html" ] && echo "✅ index.html existe" || echo "❌ index.html FALTANDO"
[ -f "assets/css/style.css" ] && echo "✅ CSS existe" || echo "❌ CSS FALTANDO"
[ -f "assets/js/main.js" ] && echo "✅ JS existe" || echo "❌ JS FALTANDO"

# 2. Verificar links no HTML
echo ""
echo "🔗 LINKS NO HTML:"
grep -o 'href="[^"]*"' index.html | grep -i css
grep -o 'src="[^"]*"' index.html | grep -i js

# 3. Verificar conteúdo CSS
echo ""
echo "🎨 CONTEÚDO CSS:"
if [ -f "assets/css/style.css" ]; then
    echo "Linhas no CSS: $(wc -l < assets/css/style.css)"
    echo "Primeiras 5 linhas:"
    head -5 assets/css/style.css
else
    echo "Procurando CSS em outros lugares..."
    find . -name "*.css" -type f | head -5
fi

# 4. Verificar estrutura HTML
echo ""
echo "📄 ESTRUTURA HTML:"
echo "DOCTYPE: $(grep -c '<!DOCTYPE' index.html)"
echo "HTML: $(grep -c '<html' index.html)"
echo "HEAD: $(grep -c '<head' index.html)"
echo "BODY: $(grep -c '<body' index.html)"
echo "FOOTER: $(grep -c '<footer' index.html)"

# 5. Verificar imagens
echo ""
echo "🖼️ IMAGENS:"
find assets/images -type f -name "*.jpg" -o -name "*.png" | wc -l | xargs echo "Total:"
