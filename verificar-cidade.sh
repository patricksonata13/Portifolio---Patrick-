#!/bin/bash
echo "🔍 VERIFICANDO ESTRUTURA DA CIDADE DE DEUS"
echo "=========================================="

# Verificar arquivos principais
echo ""
echo "📁 ARQUIVOS PRINCIPAIS:"
for file in index.html css/style.css js/main.js js/mapa-interativo.js; do
    if [ -f "$file" ]; then
        echo "✅ $file ($(wc -l < "$file") linhas)"
    else
        echo "❌ $file (FALTANDO)"
    fi
done

# Verificar estrutura de diretórios
echo ""
echo "📂 DIRETÓRIOS:"
for dir in assets/{images,mapas,historias,midia,raiz,games,audio} pages/{midia,raiz,games,historias,mapa}; do
    if [ -d "$dir" ]; then
        count=$(find "$dir" -maxdepth 1 -type f 2>/dev/null | wc -l)
        echo "✅ $dir ($count arquivos)"
    else
        echo "❌ $dir (FALTANDO)"
    fi
done

# Verificar tamanho total
echo ""
echo "📊 ESTATÍSTICAS:"
total_files=$(find . -type f | wc -l)
total_lines=$(find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')
echo "Total de arquivos: $total_files"
echo "Total de linhas (HTML/CSS/JS): $total_lines"

# Verificar links
echo ""
echo "🔗 LINKS NO INDEX.HTML:"
grep -o 'href="[^"]*"' index.html | sort | uniq

echo ""
echo "✅ Verificação concluída!"
