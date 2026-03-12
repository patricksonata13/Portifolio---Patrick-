
let inventario = []

function pegarItem(item) {
  inventario.push(item)
  alert("Você pegou: " + item)
}

function usarItem(item) {
  const index = inventario.indexOf(item)
  if(index >= 0){
    alert("Você usou: " + item)
    inventario.splice(index, 1)
  } else {
    alert("Você não tem este item")
  }
}

function mostrarInventario() {
  alert("Inventário atual: " + (inventario.length ? inventario.join(", ") : "vazio"))
}

