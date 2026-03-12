echo "CRIAR ARCO NARRATIVO"

read -p "Nome do personagem: " personagem
read -p "Nome da missão: " missao
read -p "Nome da história: " historia

slug_personagem=$(echo "$personagem" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
slug_missao=$(echo "$missao" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
slug_historia=$(echo "$historia" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

touch cdd/historia/personagens/$slug_personagem.html
touch cdd/missoes/$slug_missao.html
touch cdd/historia/$slug_historia.html

echo "Arco criado."
