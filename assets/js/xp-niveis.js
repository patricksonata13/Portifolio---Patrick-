
let jogador = {
  nome: "Player1",
  nivel: 1,
  xp: 0,
  inventario: []
}

function ganharXP(valor){
  jogador.xp += valor
  alert(`Você ganhou ${valor} XP! Total: ${jogador.xp}`)
  checarNivel()
}

function checarNivel(){
  const proxNivel = jogador.nivel * 10
  if(jogador.xp >= proxNivel){
    jogador.nivel++
    jogador.xp -= proxNivel
    alert(`Parabéns! Você subiu para o nível ${jogador.nivel}!`)
  }
}

function mostrarStatus(){
  alert(`Nome: ${jogador.nome}\nNível: ${jogador.nivel}\nXP: ${jogador.xp}\nInventário: ${jogador.inventario.join(", ") || "vazio"}`)
}

