#!/bin/bash
echo "=== USANDO REPOSITÓRIO EXISTENTE ==="
echo "Repositório: Portifolio---Patrick-"

# Corrigir remote
git remote set-url origin https://github.com/patricksonata13/Portifolio---Patrick-.git
echo "✅ Remote corrigido"

echo ""
echo "Fazendo pull do que já existe..."
if git pull origin main --allow-unrelated-histories; then
    echo "✅ Pull realizado"
else
    echo "⚠️  Pulando pull"
fi

echo ""
echo "Enviando alterações..."
if git push -u origin main; then
    echo "✅ Push realizado!"
else
    echo "❌ Erro, tentando force push..."
    git push -u origin main --force
    echo "✅ Force push realizado!"
fi

echo ""
echo "=== PRONTO! ==="
echo "Acesse: https://github.com/patricksonata13/Portifolio---Patrick-"
echo "Site: https://patricksonata.com.br"
