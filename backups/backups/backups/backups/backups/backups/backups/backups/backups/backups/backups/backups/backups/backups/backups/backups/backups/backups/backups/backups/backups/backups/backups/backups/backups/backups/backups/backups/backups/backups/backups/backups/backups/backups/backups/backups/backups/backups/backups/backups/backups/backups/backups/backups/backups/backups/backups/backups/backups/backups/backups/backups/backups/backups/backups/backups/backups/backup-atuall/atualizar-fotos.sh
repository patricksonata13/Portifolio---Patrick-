#!/bin/bash
echo "=== ATUALIZANDO FOTOS ==="

echo "1. Verificando fotos atuais..."
echo "   Profile:"
ls -la assets/images/profile/

echo ""
echo "2. Para adicionar NOVA foto:"
echo "   cp /caminho/da/foto.jpg assets/images/profile/patrick-about.jpg"

echo ""
echo "3. Para usar no site:"
echo "   Execute: sed -i '' '/id=\"about\"/,/<\/section>/s|patrick-home.jpg|patrick-about.jpg|g' index.html"

echo ""
echo "4. Para ver prévia:"
echo "   open visualizacao.html"

echo ""
echo "=== INSTRUÇÕES ==="
echo "1. Baixe sua nova foto"
echo "2. Copie para: assets/images/profile/patrick-about.jpg"
echo "3. Execute o comando acima"
echo "4. Teste: open index.html"
