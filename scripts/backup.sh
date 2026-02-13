#!/bin/bash
# Backup automático

BACKUP_DIR="$HOME/Desktop/backup-patrick-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Criando backup em $BACKUP_DIR..."
cp -r ~/site-patrick "$BACKUP_DIR"
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
rm -rf "$BACKUP_DIR"

echo "✅ Backup criado: $BACKUP_DIR.tar.gz"
ls -lh "$BACKUP_DIR.tar.gz"
