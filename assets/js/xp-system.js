
let xp = parseInt(localStorage.getItem("xp")) || 0

function ganharXP(valor){

xp += valor

localStorage.setItem("xp", xp)

alert("Você ganhou " + valor + " XP")

}

