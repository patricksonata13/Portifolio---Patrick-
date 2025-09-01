
#!/bin/bash
echo "Fazendo build do Next.js..."
npm run build

echo "Subindo para o GitHub..."
git add .
git commit -m "Deploy automático"
git push origin main
