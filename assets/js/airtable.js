async function enviarParaAirtable(data) {

const url = "https://api.airtable.com/v0/BASE/TABELA";

fetch(url,{
method:"POST",
headers:{
"Authorization":`Bearer ${CONFIG.AIRTABLE_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

}
