// Exemplo de produtos (adicione mais conforme necessário)
const produtos = [
    {
        id: 1,
        imagem: "../assets/imagens/mouse.jpg",
        nome: "Mouse Gamer",
        descricçao: "Mouse gamer Redragon com RGB e alta precisão.",	
        preco: 499.90,
        imagem: "assets/imagens/mouse.jpg"
    },
    {
        id: 2,
        nome: "Teclado Mecânico",
        preco: 299.90,
        imagem: "assets/imagens/teclado.jpg"
    },
    {
        id: 3,
        nome: "Headset RGB",
        preco: 399.90,
        imagem: "assets/imagens/headset.jpg"
    },
    {
        id: 4,
        nome: "Monitor 24'' Full HD",
        preco: 899.90,
        imagem: "assets/imagens/monitor.jpg"
    },
    {
        id: 5,
        nome: "Mousepad Gamer XL",
        preco: 99.90,
        imagem: "assets/imagens/mousepad.jpg"
    },
    {
        id: 6,
        nome: "Webcam HD",
        preco: 159.90,
        imagem: "assets/imagens/webcam.jpg"
    },
    {
        id: 7,
        nome: "Cadeira Gamer",
        preco: 1299.90,
        imagem: "assets/imagens/cadeira.jpg"
    },
    {
        id: 8,
        nome: "Microfone USB",
        preco: 249.90,
        imagem: "assets/imagens/microfone.jpg"
    },
    {
        id: 9,
        nome: "Placa de Vídeo RTX 3060",
        preco: 2499.90,
        imagem: "assets/imagens/placa-video.jpg"
    }
];

// Função para renderizar os produtos na tela
function renderizarProdutos(lista) {
    const container = document.querySelector('.produtos-lista');
    if (!container) return;
    container.innerHTML = '';
    if (lista.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Nenhum produto encontrado.</p>';
        return;
    }
    lista.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <div class="produto-nome">${produto.nome}</div>
            <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
            <button class="btn-carrinho" data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
    });

    // Evento para adicionar ao carrinho
    document.querySelectorAll('.btn-carrinho').forEach(btn => {
        btn.onclick = () => {
            alert('Produto adicionado ao carrinho!');
        };
    });
}

// Função de pesquisa
function pesquisarProdutos(termo) {
    const termoLower = termo.toLowerCase();
    return produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termoLower)
    );
}

// Evento de pesquisa
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(produtos);

    const formPesquisa = document.querySelector('.header-search');
    if (formPesquisa) {
        formPesquisa.addEventListener('submit', function(e) {
            e.preventDefault();
            const termo = formPesquisa.querySelector('.search-input').value;
            const resultados = pesquisarProdutos(termo);
            renderizarProdutos(resultados);
        });
    }
});