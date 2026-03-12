echo "PROCURANDO PAGINAS NAO LINKADAS"

for file in $(find . -name "*.html"); do
grep -R "$file" . > /dev/null
if [ $? -ne 0 ]; then
echo "Possível página órfã: $file"
fi
done
