echo '<?xml version="1.0" encoding="UTF-8"?>'
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

find . -name "*.html" \
-not -path "./src/*" \
-not -path "./admin/*" \
-not -path "./assets/*" \
| while read file
do
url=$(echo $file | sed 's|^\./||')
echo "<url>"
echo "<loc>https://patricksonata.com.br/$url</loc>"
echo "<changefreq>monthly</changefreq>"
echo "</url>"
done

echo "</urlset>"
