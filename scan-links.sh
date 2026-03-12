echo "MAPEANDO LINKS INTERNOS..."

grep -R "href=" . | grep ".html"

echo ""
echo "MAPEANDO LINKS PARA PASTAS..."

grep -R 'href="/' .

echo ""
echo "PÁGINAS HTML EXISTENTES..."

find . -name "*.html"
