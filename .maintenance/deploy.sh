#!/bin/bash

# ============================================
# SCRIPT DE DEPLOY AUTOMÁTICO
# Patrick Sonata - Site Portfolio
# ============================================

echo "🚀 Iniciando deploy do site Patrick Sonata..."
echo "=============================================="

# Configurações
SITE_DIR="$(pwd)"
BACKUP_DIR="$HOME/site-backups"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funções
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se está no diretório correto
if [ ! -f "index.html" ] || [ ! -d "assets" ]; then
    print_error "Diretório do site não encontrado!"
    echo "Execute este script do diretório do site: ~/site-patrick"
    exit 1
fi

# 1. Criar backup
echo ""
echo "📦 Criando backup..."
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/site-patrick-$TIMESTAMP.tar.gz" --exclude='.git' --exclude='node_modules' .

if [ $? -eq 0 ]; then
    print_success "Backup criado: $BACKUP_DIR/site-patrick-$TIMESTAMP.tar.gz"
    
    # Manter apenas últimos 5 backups
    cd "$BACKUP_DIR"
    ls -t site-patrick-*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null || true
    cd "$SITE_DIR"
else
    print_warning "Falha ao criar backup. Continuando..."
fi

# 2. Verificar status do Git
echo ""
echo "🔍 Verificando status do Git..."
git status

# Verificar se há mudanças
if [ -z "$(git status --porcelain)" ]; then
    print_warning "Nenhuma alteração para commitar."
    read -p "Deseja continuar mesmo assim? (s/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Deploy cancelado."
        exit 0
    fi
fi

# 3. Adicionar alterações
echo ""
echo "📝 Adicionando alterações..."
git add .

if [ $? -ne 0 ]; then
    print_error "Falha ao adicionar alter
