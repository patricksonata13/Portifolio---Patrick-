async function loadComponent(id, file) {
    try {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error("Erro carregando componente:", file);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadComponent("header", "/components/header.html");
    loadComponent("footer", "/components/footer.html");
});
