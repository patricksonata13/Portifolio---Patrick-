const input = document.getElementById("busca");
const resultados = document.getElementById("resultados");

input.addEventListener("input", function(){

const termo = input.value.toLowerCase();

resultados.innerHTML = "";

if(termo.length < 2){
return;
}

paginas.forEach(pagina => {

if(pagina.titulo.toLowerCase().includes(termo)){

const div = document.createElement("div");

div.className = "resultado";

div.innerHTML = "<a href='"+pagina.url+"'>" + pagina.titulo + "</a>";

resultados.appendChild(div);

}

});

});
