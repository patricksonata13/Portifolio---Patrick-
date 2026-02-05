# 📋 GUIA DE IMPLEMENTAÇÃO

## 🎯 Como Organizar seu Repositório Atual

### Passo 1: Backup do Repositório Atual
```bash
# Clone seu repositório atual
git clone https://github.com/patricksonata13/Portifolio---Patrick-.git backup-site

# Ou se já tem local:
cp -r Portifolio---Patrick- backup-site
```

### Passo 2: Limpar o Repositório Atual
```bash
cd Portifolio---Patrick-

# Remover arquivos antigos (CUIDADO: faça backup antes!)
rm -rf app/
rm -rf public/images/creditos/
rm index.html.backup-20251201
rm galeria*.html
rm novagaleria.html
rm substituir-fotos.html
rm upload.html
rm verificar-foto.html
rm arduino bash lua pgsql ts tsx yaml json markdown html
rm next.config.ts package.json postcss.config.mjs tsconfig.json
rm deploy.sh final_check.sh script.js sonata.github.io
```

### Passo 3: Copiar Arquivos Novos
```bash
# Copie os arquivos do site organizado para o repositório
cp /caminho/do/site-organizado/index.html .
cp /caminho/do/site-organizado/README.md .
cp /caminho/do/site-organizado/CNAME .
cp /caminho/do/site-organizado/_headers .
cp /caminho/do/site-organizado/.gitignore .

# Copie as pastas
cp -r /caminho/do/site-organizado/css .
cp -r /caminho/do/site-organizado/js .

# Mantenha sua pasta images atual
# (não copie se você já tem as imagens)
```

### Passo 4: Organizar Imagens
```bash
# Certifique-se de que suas imagens estão em:
# images/works/fotodeperfil.webp
# images/works/fotodeperfil.jpg
# images/works/pabloeluisao.webp
# images/works/pabloeluisao.jpg
# etc.

# Se suas imagens estiverem em outro local, mova-as:
mkdir -p images/works
mv public/images/* images/works/
```

### Passo 5: Criar Pasta Archive (opcional)
```bash
# Se quiser guardar arquivos antigos sem deletar:
mkdir archive
mkdir archive/backups
mkdir archive/experimentos
mkdir archive/galerias-antigas

# Mover arquivos antigos para archive:
mv galeria*.html archive/galerias-antigas/
mv novagaleria.html archive/galerias-antigas/
mv next.config.ts archive/experimentos/
mv package.json archive/experimentos/
# etc.
```

### Passo 6: Commit e Push
```bash
git add .
git commit -m "🎨 Reorganiza site completo - estrutura limpa e profissional"
git push origin main
```

---

## ✅ Checklist Pós-Implementação

- [ ] Site carrega sem erros no console
- [ ] Menu mobile funciona
- [ ] Animações fade-in funcionam
- [ ] Todas as imagens carregam (verificar WebP + fallback JPG)
- [ ] Links de contato funcionam
- [ ] Formulário de contato funciona
- [ ] Favicon aparece
- [ ] Open Graph tags funcionam (testar no Facebook Debugger)
- [ ] Site é responsivo (testar mobile, tablet, desktop)
- [ ] Velocidade do site é boa (testar no PageSpeed Insights)

---

## 🚀 Deploy

### GitHub Pages
1. Repositório → Settings → Pages
2. Source: `main` branch, root folder
3. Custom domain: `patricksonata.com.br`
4. Enforce HTTPS: ✅

### Vercel (alternativa)
1. Importar repositório na Vercel
2. Build settings: deixe vazio (site estático)
3. Adicionar domínio customizado
4. Deploy automático ativado

---

## 🔧 Manutenção

### Adicionar Novo Projeto ao Portfólio
1. Adicione imagem em `images/works/`
2. No `index.html`, copie um `<div class="portfolio-item">` existente
3. Altere imagem, título e descrição
4. Commit e push

### Atualizar Informações Pessoais
1. Edite seção `#about` no `index.html`
2. Mantenha estrutura HTML
3. Commit e push

### Mudar Cores do Site
1. Edite variáveis `:root` no `css/style.css`
2. Altere `--primary` e `--primary-dark`
3. Salve, commit e push

---

## 🆘 Problemas Comuns

**Site está quebrado / desconfigurado:**
- Verifique se os caminhos CSS/JS estão corretos
- Verifique console do navegador (F12)
- Confirme que estrutura de pastas está correta

**Menu mobile não abre:**
- Verifique se `js/main.js` está carregando
- Confirme que classe `.mobile-menu-btn` existe no HTML
- Verifique console para erros JS

**Imagens não aparecem:**
- Confirme que imagens existem em `images/works/`
- Verifique paths no HTML (devem ser relativos)
- Teste com JPG se WebP não funcionar

**Domínio customizado não funciona:**
- Confirme que arquivo `CNAME` existe
- Verifique DNS do domínio (A record ou CNAME)
- Aguarde propagação DNS (até 48h)

---

## 📞 Suporte

Se precisar de ajuda, verifique:
- Console do navegador (F12 → Console)
- Network tab para erros de carregamento
- README.md para documentação completa

---

**Última atualização:** 04/02/2026
