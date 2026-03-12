
const locais = ["Beco da Internet", "Conjunto Azul", "Praça", "Mercado", "Baile"]
const objetivos = ["recuperar item", "encontrar NPC", "investigar", "entregar mensagem"]

function gerarMissao(){

const local = locais[Math.floor(Math.random()*locais.length)]
const objetivo = objetivos[Math.floor(Math.random()*objetivos.length)]

const missao = "Missão: " + objetivo + " em " + local

alert(missao)

return missao
}

