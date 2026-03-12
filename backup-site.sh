DATA=$(date +%Y-%m-%d)

mkdir -p backups-site

tar -czf backups-site/site-$DATA.tar.gz \
--exclude=".git" \
--exclude="node_modules" \
.

echo "Backup criado em backups-site/site-$DATA.tar.gz"
