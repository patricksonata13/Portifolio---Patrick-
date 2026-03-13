document.addEventListener('DOMContentLoaded', function() {
  const inputBusca = document.getElementById('busca');
  const resultadosDiv = document.getElementById('resultados');

  function buscar(termo) {
    if (!termo) {
      resultadosDiv.innerHTML = '';
      return;
    }
    const termoLower = termo.toLowerCase();
    const encontrados = paginas.filter(p => p.titulo.toLowerCase().includes(termoLower));
    mostrarResultados(encontrados);
  }

  function mostrarResultados(lista) {
    resultadosDiv.innerHTML = '';
    if (lista.length === 0) {
      resultadosDiv.innerHTML = '<p class="nenhum-resultado">Nenhuma página encontrada.</p>';
      return;
    }
    lista.forEach(p => {
      const link = document.createElement('a');
      link.href = p.url;
      link.className = 'resultado-item';
      link.innerHTML = `<span class="titulo">${p.titulo}</span>`;
      resultadosDiv.appendChild(link);
    });
  }

  inputBusca.addEventListener('input', function(e) {
    buscar(e.target.value);
  });
});
