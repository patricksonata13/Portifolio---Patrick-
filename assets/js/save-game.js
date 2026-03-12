
function salvarJogo(data){
localStorage.setItem("saveGame", JSON.stringify(data))
alert("Jogo salvo!")
}

function carregarJogo(){
const data = JSON.parse(localStorage.getItem("saveGame"))
if(data){
alert("Jogo carregado! Missões: " + data.missoes.length)
return data
}else{
alert("Nenhum save encontrado")
return {missaoAtiva: null, inventario: [], xp:0}
}
}

