
function criarProjeto(){

const titulo = document.getElementById("titulo").value
const tipo = document.getElementById("tipo").value
const descricao = document.getElementById("descricao").value

if(!titulo){
alert("Digite um título")
return
}

const slug = titulo.toLowerCase().replaceAll(" ","-")

const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>${titulo}</title>
<link rel="stylesheet" href="/assets/css/style.css">
</head>

<body>

<h1>${titulo}</h1>

<p><strong>Tipo:</strong> ${tipo}</p>

<p>${descricao}</p>

<p><a href="/trabalhos.html">← Voltar para projetos</a></p>

</body>
</html>
`

const blob = new Blob([html], {type: "text/html"})

const link = document.createElement("a")

link.href = URL.createObjectURL(blob)

link.download = slug + ".html"

link.click()

document.getElementById("status").innerHTML =
"Página gerada. Coloque o arquivo na pasta /projetos."

}
