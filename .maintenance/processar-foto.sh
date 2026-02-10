#!/bin/bash
echo "=== PROCESSANDO IMG_5067.heif ==="

# Procurar o arquivo
FOTO=$(find ~ -name "IMG_5067.heif" -type f 2>/dev/null | head -1)

if [ -z "$FOTO" ]; then
    echo "❌ Arquivo IMG_5067.heif não encontrado!"
    echo ""
    echo "Procure manualmente:"
    echo "1. Abra o Finder"
    echo "2. Digite 'IMG_5067.heif' na busca"
    echo "3. Clique direito → 'Mostrar no Finder'"
    echo "4. Anote o caminho completo"
    exit 1
fi

echo "✅ Encontrada: $FOTO"
echo "Tamanho: $(ls -lh "$FOTO" | awk '{print $5}')"

# Verificar se tem ImageMagick instalado
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo ""
    echo "⚠️  ImageMagick não está instalado."
    echo "Instale com: brew install imagemagick"
    echo ""
    echo "Ou use uma destas alternativas:"
    echo "1. Converta online: https://cloudconvert.com/heic-to-jpg"
    echo "2. Abra no Preview e exporte como JPG"
    echo "3. Use outra foto temporariamente"
    exit 1
fi

echo ""
echo "Convertendo HEIF para JPG..."

# Criar pasta se não existir
mkdir -p assets/images/profile

# Converter usando ImageMagick
if command -v magick &> /dev/null; then
    magick "$FOTO" assets/images/profile/patrick-home.jpg
elif command -v convert &> /dev/null; then
    convert "$FOTO" assets/images/profile/patrick-home.jpg
fi

echo "✅ Convertida com sucesso!"

# Criar cópias para diferentes usos
cp assets/images/profile/patrick-home.jpg assets/images/profile/patrick-about.jpg
cp assets/images/profile/patrick-home.jpg assets/images/profile/patrick-og.jpg

echo ""
echo "✅ Fotos configuradas:"
ls -la assets/images/profile/*.jpg

echo ""
echo "Para redimensionar (opcional):"
echo "  magick assets/images/profile/patrick-home.jpg -resize 800x800 assets/images/profile/patrick-home.jpg"
echo "  magick assets/images/profile/patrick-og.jpg -resize 1200x630^ -gravity center -extent 1200x630 assets/images/profile/patrick-og.jpg"
