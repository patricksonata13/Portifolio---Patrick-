#!/bin/bash
echo "=== ORGANIZANDO SITE COMPLETO ==="

echo "1. Criando estrutura de pastas..."
mkdir -p assets/images/{profile,works/{tv,teatro,autoriais,documentais}}

echo "2. Movendo imagens..."
# Mova apenas se existirem
[ -f "images/works/fotodeperfil.jpg" ] && mv images/works/fotodeperfil.jpg assets/images/profile/patrick-sonata-perfil.jpg

# Mova imagens por categoria
for img in images/works/*.jpg images/works/*.webp 2>/dev/null; do
    if [ -f "$img" ]; then
        name=$(basename "$img")
        case $name in
            *pabloeluisao*|*programazorra*|*zorra*|*humornegro*|*jongo*)
                mv "$img" assets/images/works/tv/
                echo "  📺 $name → tv/"
                ;;
            *cidadecorreriapeca*)
                mv "$img" assets/images/works/teatro/
                echo "  🎭 $name → teatro/"
                ;;
            *doccidadecorreria*)
                mv "$img" assets/images/works/documentais/
                echo "  🎬 $name → documentais/"
                ;;
            *originais*|*pelada*|*praprovar*)
                mv "$img" assets/images/works/autoriais/
                echo "  ✍️  $name → autoriais/"
                ;;
        esac
    fi
done

echo "3. Usando foto 'Mini Bio'..."
if [ -f ~/Downloads/"Mini Bio - Patrick Sonata.jpg" ]; then
    cp ~/Downloads/"Mini Bio - Patrick Sonata.jpg" assets/images/profile/patrick-home.jpg
    cp ~/Downloads/"Mini Bio - Patrick Sonata.jpg" assets/images/profile/patrick-about.jpg
    cp ~/Downloads/"Mini Bio - Patrick Sonata.jpg" assets/images/profile/patrick-og.jpg
    echo "  ✅ Foto 'Mini Bio' configurada"
else
    echo "  ⚠️  Foto 'Mini Bio' não encontrada, usando padrão"
    cp assets/images/profile/patrick-sonata-perfil.jpg assets/images/profile/patrick-home.jpg
    cp assets/images/profile/patrick-sonata-perfil.jpg assets/images/profile/patrick-about.jpg
    cp assets/images/profile/patrick-sonata-perfil.jpg assets/images/profile/patrick-og.jpg
fi

echo "4. Atualizando HTML..."
sed -i '' 's|images/works/|assets/images/works/|g' index.html
sed -i '' 's|fotodeperfil.jpg|patrick-home.jpg|g' index.html
sed -i '' '/id="about"/,/<\/section>/s|patrick-home.jpg|patrick-about.jpg|g' index.html
sed -i '' '16,22s|patrick-home.jpg|patrick-og.jpg|g' index.html

echo "5. Atualizando CSS e JS..."
sed -i '' 's|"css/|"assets/css/|g' index.html
sed -i '' 's|"js/|"assets/js/|g' index.html
mkdir -p assets/{css,js}
[ -d "css" ] && mv css/* assets/css/ 2>/dev/null
[ -d "js" ] && mv js/* assets/js/ 2>/dev/null

echo "6. Limpando..."
rm -rf images css js 2>/dev/null

echo "=== PRONTO! ==="
echo "Estrutura:"
tree assets/images -L 3

echo ""
echo "Teste: open index.html"
