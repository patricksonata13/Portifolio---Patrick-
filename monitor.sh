#!/bin/bash
echo "=== MONITOR DO PORTFÓLIO ==="
date
echo "Site: https://patricksonata.com.br"
echo "Última atualização: $(git log -1 --format="%cd" --date=relative)"
echo "Status HTTP: $(curl -s -o /dev/null -w "%{http_code}" https://patricksonata.com.br)"
