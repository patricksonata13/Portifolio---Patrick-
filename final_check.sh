#!/bin/bash
echo "=== VERIFICAÇÃO FINAL DO PORTFÓLIO ==="

echo -e "\n1. ESTRUTURA DE ARQUIVOS:"
echo "Total arquivos: $(find . -type f -name "*.html" -o -name "*.webp" -o -name "*.jpg" | wc -l)"
echo "HTML: $(find . -name "*.html" | wc -l)"
echo "WebP: $(find . -name "*.webp" | wc -l)"
echo "JPEG: $(find . -name "*.jpg" | wc -l)"

echo -e "\n2. TAMANHO DAS IMAGENS (WebP vs JPEG):"
for img in images/works/*.webp; do
    jpg="${img%.webp}.jpg"
    if [ -f "$jpg" ]; then
        webp_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        jpg_size=$(stat -f%z "$jpg" 2>/dev/null || stat -c%s "$jpg")
        reduction=$((100 - (webp_size * 100 / jpg_size)))
        echo "$(basename $img): ${jpg_size}KB → ${webp_size}KB (-${reduction}%)"
    fi
done | head -5

echo -e "\n3. SEO BÁSICO:"
echo "Meta description: $(grep -o 'meta name="description" content="[^"]*"' index.html | head -1)"
echo "Title: $(grep -o '<title>[^<]*</title>' index.html)"
echo "Preload: $(grep -c 'rel="preload"' index.html)"

echo -e "\n4. PERFORMANCE:"
echo "Lazy loading: $(grep -c 'loading="lazy"' index.html)"
echo "Eager loading: $(grep -c 'loading="eager"' index.html)"
echo "Width/Height definidos: $(grep -c 'width="' index.html)"

echo -e "\n5. ACESSIBILIDADE:"
echo "Alt texts: $(grep -c 'alt="' index.html)"
echo "ARIA labels: $(grep -c 'aria-' index.html || echo 0)"

echo -e "\n✅ VERIFICAÇÃO COMPLETA!"
