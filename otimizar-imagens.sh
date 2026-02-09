#!/bin/bash

# ============================================
# SCRIPT DE OTIMIZAÇÃO DE IMAGENS
# Patrick Sonata - Site Portfolio
# ============================================

echo "🚀 Iniciando otimização de imagens..."
echo "===================================="

# Verificar se o ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick não encontrado. Instalando..."
    
    # macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            brew install imagemagick
        else
            echo "❌ Homebrew não encontrado. Instale o ImageMagick manualmente:"
            echo "   https://imagemagick.org/script/download.php"
            exit 1
        fi
    # Linux
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y imagemagick
    else
        echo "❌ Sistema operacional não suportado. Instale o ImageMagick manualmente."
        exit 1
    fi
fi

# Entrar no diretório do site
cd "$(dirname "$0")" || exit 1

echo "📁 Diretório atual: $(pwd)"

# Criar backups das imagens originais
echo "💾 Criando backup das imagens originais..."
mkdir -p backup-original
cp -r assets/images/ backup-original/ 2>/dev/null || true

# Processar imagens de perfil
echo "🖼️  Processando imagens de perfil..."
mkdir -p assets/images/profile/optimized

for img in assets/images/profile/*.jpg assets/images/profile/*.jpeg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        
        echo "   🔄 Convertendo: $filename"
        
        # JPG otimizado (qualidade 75%)
        convert "$img" -strip -interlace Plane -gaussian-blur 0.05 -quality 75% \
                -resize "800x800^" -gravity center -extent 800x800 \
                "assets/images/profile/optimized/${name}-opt.jpg"
        
        # WebP (qualidade 80%)
        convert "$img" -strip -quality 80% \
                -resize "800x800^" -gravity center -extent 800x800 \
                "assets/images/profile/optimized/${name}.webp"
        
        # Thumbnail para performance
        convert "$img" -strip -quality 60% \
                -resize "100x100^" -gravity center -extent 100x100 \
                "assets/images/profile/optimized/${name}-thumb.jpg"
    fi
done

# Processar imagens de trabalhos
echo "🎨 Processando imagens de trabalhos..."
mkdir -p assets/images/works/optimized

for img in assets/images/works/*.jpg assets/images/works/*.jpeg assets/images/works/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        extension="${filename##*.}"
        
        echo "   🔄 Convertendo: $filename"
        
        # JPG/PNG otimizado
        if [[ "$extension" == "png" ]]; then
            convert "$img" -strip -quality 90% \
                    -resize "1200x800^" \
                    "assets/images/works/optimized/${name}-opt.png"
        else
            convert "$img" -strip -interlace Plane -gaussian-blur 0.05 -quality 70% \
                    -resize "1200x800^" \
                    "assets/images/works/optimized/${name}-opt.jpg"
        fi
        
        # WebP
        convert "$img" -strip -quality 75% \
                -resize "1200x800^" \
                "assets/images/works/optimized/${name}.webp"
        
        # Thumbnail
        convert "$img" -strip -quality 60% \
                -resize "300x200^" \
                "assets/images/works/optimized/${name}-thumb.jpg"
    fi
done

# Calcular economia
echo "📊 Calculando economia de espaço..."
original_size=$(du -sk backup-original/ | cut -f1)
optimized_size=$(du -sk assets/images/ | cut -f1)
economy=$((original_size - optimized_size))
economy_percent=$((economy * 100 / original_size))

echo "===================================="
echo "✅ Otimização concluída!"
echo ""
echo "📈 Resultados:"
echo "   Tamanho original: ${original_size} KB"
echo "   Tamanho otimizado: ${optimized_size} KB"
echo "   Economia: ${economy} KB (${economy_percent}%)"
echo ""
echo "📁 Estrutura criada:"
echo "   📂 assets/images/profile/optimized/"
echo "   📂 assets/images/works/optimized/"
echo "   📂 backup-original/"
echo ""
echo "🔄 Para usar as imagens otimizadas, atualize os caminhos no HTML:"
echo "   De: assets/images/works/pabloeluisao-logo.jpg"
echo "   Para: assets/images/works/optimized/pabloeluisao-logo-opt.jpg"
echo ""
echo "🌐 Para WebP com fallback, use:"
echo "   <picture>"
echo "     <source srcset=\"image.webp\" type=\"image/webp\">"
echo "     <source srcset=\"image-opt.jpg\" type=\"image/jpeg\">"
echo "     <img src=\"image-opt.jpg\" alt=\"Descrição\">"
echo "   </picture>"
