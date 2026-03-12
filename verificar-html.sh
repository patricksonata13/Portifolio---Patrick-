echo "Verificando HTML duplicado..."

grep -R "<html" .

echo "Verificando </body> duplicado..."

grep -R "</body>" .

echo "Verificando </html> duplicado..."

grep -R "</html>" .
