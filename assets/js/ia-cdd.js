
function gerar(){

const tema = document.getElementById("tema").value;

const saida = document.getElementById("saida");

if(!tema){
saida.innerHTML = "Digite um tema primeiro.";
return;
}

const ideias = [

"Personagem: Um morador da Cidade de Deus que transformou sucata tecnológica em armas improvisadas.",

"Missão: Infiltrar-se em uma torre de vigilância abandonada para recuperar um servidor escondido.",

"História: Após um apagão digital, facções disputam o controle da última rede de comunicação do bairro.",

"Personagem: Uma DJ clandestina que usa frequências piratas para transmitir mensagens secretas.",

"Missão: Roubar um drone de vigilância que caiu no território rival.",

"História: Um grupo de jovens descobre um mapa antigo da Cidade de Deus revelando passagens subterrâneas."

];

const aleatorio = ideias[Math.floor(Math.random()*ideias.length)];

saida.innerHTML = "<h3>Ideia gerada:</h3><p>"+aleatorio+"</p><p><strong>Tema usado:</strong> "+tema+"</p>";

}
