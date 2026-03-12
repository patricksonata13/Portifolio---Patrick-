
class Dialogo {
  constructor(npc, falas) {
    this.npc = npc
    this.falas = falas
  }

  iniciar() {
    let i = 0
    const next = () => {
      if(i >= this.falas.length) return
      const fala = this.falas[i]
      if(fala.tipo === "escolha") {
        const op = prompt(`${this.npc} diz: ${fala.texto}\nEscolha: ${fala.opcoes.join(", ")}`)
        const index = fala.opcoes.indexOf(op)
        if(index >= 0 && fala.resultados[index]) {
          alert(fala.resultados[index])
        } else {
          alert("Escolha inválida")
        }
      } else {
        alert(`${this.npc} diz: ${fala.texto}`)
      }
      i++
      next()
    }
    next()
  }
}

const dialogo1 = new Dialogo("Joice", [
  {tipo:"normal", texto:"Ei! Quer explorar a cidade comigo?"},
  {tipo:"escolha", texto:"Qual caminho você escolhe?", opcoes:["Praça","Beco da Internet"], resultados:["Você vai à Praça","Você vai ao Beco da Internet"]}
])

