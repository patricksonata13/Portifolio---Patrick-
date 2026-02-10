#!/bin/bash
echo "🔍 Verificando integridade do site..."
FILES=("index.html" "assets/css/style.css" "assets/js/supabase-client.js" "projetos/patika/index.html" "projetos/cdd/index.html")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado."
    else
        echo "❌ ERRO: $file está faltando!"
    fi
done
