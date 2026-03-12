
function miniJogoAdivinha(){
  const numero = Math.floor(Math.random()*10)+1
  let tentativa = parseInt(prompt("Adivinhe um número entre 1 e 10"))
  if(tentativa === numero){
    alert("Parabéns! Você acertou!")
  } else {
    alert("Errou! O número era " + numero)
  }
}

