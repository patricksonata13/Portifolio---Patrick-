#!/bin/bash
echo "=== PROCURANDO FOTOS RECENTES ==="

# Método 1: Arquivos .jpg/.jpeg/.png modificados hoje
echo "1. Fotos modificadas hoje:"
find ~ -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -mtime 0 2>/dev/null | head -10

# Método 2: Área de Trabalho e Downloads
echo ""
echo "2. Área de Trabalho:"
ls ~/Desktop/*.jpg ~/Desktop/*.jpeg ~/Desktop/*.png 2>/dev/null | head -5

echo ""
echo "3. Downloads:"
ls ~/Downloads/*.jpg ~/Downloads/*.jpeg ~/Downloads/*.png 2>/dev/null | head -5

echo ""
echo "4. Documentos:"
ls ~/Documents/*.jpg ~/Documents/*.jpeg ~/Documents/*.png 2>/dev/null | head -5

echo ""
echo "=== INSTRUÇÕES ==="
echo "Quando encontrar sua foto, copie com:"
echo "cp /caminho/completo/da/foto.jpg assets/images/profile/patrick-about.jpg"
