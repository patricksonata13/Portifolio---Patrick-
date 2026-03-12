
let conquistas = JSON.parse(localStorage.getItem("conquistas")) || []

function desbloquear(nome){

if(!conquistas.includes(nome)){

conquistas.push(nome)

localStorage.setItem("conquistas", JSON.stringify(conquistas))

alert("Conquista desbloqueada: " + nome)

}

}

