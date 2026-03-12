echo "PESO DAS PAGINAS"

find . -name "*.html" -exec wc -l {} \ | sort -n
