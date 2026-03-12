#!/bin/bash

echo ""
echo "GERADOR DE PAGINAS CDD 3001"
echo ""

read -p "Tipo (personagem/missao/historia): " tipo
read -p "Nome da página: " nome

slug=$(echo "$nome" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# normalizar tipo
tipo=$(echo "$tipo" | tr '[:upper:]' '[:lower:]')

if [[ "$tipo" == "personagem" || "$tipo" == "personagens" ]]; then
pasta="cdd/historia/personagens"

elif [[ "$tipo" == "missao" || "$tipo" == "missões" || "$tipo" == "missoes" ]]; then
pasta="cdd/missoes"

elif [[ "$tipo" == "historia" || "$tipo" == "histórias" ]]; then
pasta="cdd/historia"

else
echo ""
echo "Tipo inválido. Use: personagem, missao ou historia"
exit 1
fi

arquivo="$pasta/$slug.html"

cat > "$arquivo" << PAGE
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>$nome | CDD 3001</title>
<link rel="stylesheet" href="/assets/css/style.css">

<meta name="description" content="$nome - Universo CDD 3001 criado por Patrick Sonata">
<meta name="author" content="Patrick Sonata">

</head>

<body>

<h1>$nome</h1>

<p>Conteúdo em desenvolvimento dentro do universo CDD 3001.</p>

<hr>

<p>
<a href="/cdd/universo.html">← Voltar ao universo</a>
</p>

</body>
</html>
PAGE

echo ""
echo "Página criada com sucesso:"
echo "$arquivo"

