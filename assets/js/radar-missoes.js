
const missoes = [
"Recuperar drone",
"Encontrar hacker",
"Explorar beco",
"Investigar servidor"
]

function novaMissao(){

const m = missoes[Math.floor(Math.random()*missoes.length)]

alert("Nova missão: " + m)

}

