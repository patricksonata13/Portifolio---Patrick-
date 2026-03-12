
function pegarItem(item){
  jogador.inventario.push(item)
  alert(`Você pegou: ${item}`)
}

function usarItem(item){
  const index = jogador.inventario.indexOf(item)
  if(index >= 0){
    alert(`Você usou: ${item}`)
    jogador.inventario.splice(index, 1)
    ganharXP(2) // usar item dá XP
  } else {
    alert("Você não possui este item")
  }
}

