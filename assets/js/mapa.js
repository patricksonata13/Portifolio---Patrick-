
let zonas = {
  "Praça Central": {desbloqueada:true},
  "Beco da Internet": {desbloqueada:false},
  "Laboratório Secreto": {desbloqueada:false}
}

function mostrarMapa(){
  let lista = Object.keys(zonas).map(z => {
    return `${z} - ${zonas[z].desbloqueada ? "🔓" : "🔒"}`
  }).join("\n")
  alert("Mapa:\n" + lista)
}

function desbloquearZona(zona){
  if(zonas[zona]){
    zonas[zona].desbloqueada = true
    alert(`${zona} foi desbloqueada!`)
    ganharXP(3)
  } else {
    alert("Zona não existe")
  }
}

