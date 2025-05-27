document.addEventListener('DOMContentLoaded', () => {
    const produto = JSON.parse(localStorage.getItem('produtoSelecionado'));
    if (produto) {
        // Renderize os detalhes do produto na página
        document.getElementById('nome-produto').innerText = produto.nome;
        // ...e assim por diante
    }
});
