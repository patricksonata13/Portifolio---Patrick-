
const NPCs = {
  "Joice": {
    dialogos: [
      {texto:"Ei! Quer explorar a cidade comigo?", opcoes:["Sim","Não"], resultados:["Vamos juntos!","Ok, depois talvez."]}
    ]
  },
  "Sabrina": {
    dialogos: [
      {texto:"Você trouxe o caderno de missões?", opcoes:["Sim","Não"], resultados:["Ótimo! Vamos planejar.","Preciso encontrar."]}
    ]
  }
}

function falarComNPC(nome){
  if(NPCs[nome]){
    const d = NPCs[nome].dialogos[0]
    const escolha = prompt(`${nome}: ${d.texto}\nEscolha: ${d.opcoes.join(", ")}`)
    const index = d.opcoes.indexOf(escolha)
    if(index >= 0){
      alert(d.resultados[index])
      ganharXP(2)
    } else {
      alert("Escolha inválida")
    }
  } else {
    alert("NPC não encontrado")
  }
}

