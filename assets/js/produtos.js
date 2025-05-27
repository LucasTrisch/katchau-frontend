// Exemplo de produtos (adicione mais conforme necessário)
const produtos = [
    {
        id: 1,
        imagem: "../assets/imagens/mouse.jpg",
        nome: "Mouse gamer Redragon com RGB e alta precisão.",
        preco: 499.90,
        imagem: "assets/imagens/mouse.jpg"
    },
    {
        id: 2,
        nome: "Teclado Corsair Mecânico",
        preco: 449.90,
        imagem: "assets/imagens/tecladocorsair.png"

    },
    {
        id: 3,
        nome: "Headset Quantum One,JBL",
        preco: 890.90,
        imagem: "assets/imagens/headset.jpg"
    },
    {
        id: 4,
        nome: "Monitor 31.5'' Full HD,165Hz",
        preco: 2899.90,
        imagem: "assets/imagens/monitor.webp"
    },
    {
        id: 5,
        nome: "Mousepad RGB",
        preco: 99.90,
        imagem: "assets/imagens/mousepad.jpg"
    },
    {
        id: 6,
        nome: "Webcam 4K",
        preco: 500.00,
        imagem: "assets/imagens/webcam.webp"
    },
    {
        id: 7,
        nome: "Cadeira Gamer",
        preco: 1299.90,
        imagem: "assets/imagens/cadeira.webp"
    },
    {
        id: 8,
        nome: "Microfone USB",
        preco: 349.90,
        imagem: "assets/imagens/microfone.jpg"
    },
    {
        id: 9,
        nome: "Placa de Vídeo RTX 5090",
        preco: 9000.00,
        imagem: "assets/imagens/rtx5090.webp"
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
            <button class="btn-detalhes" data-id="${produto.id}">Ver Detalhes</button>
        `;
        container.appendChild(card);
    });

    // Evento para adicionar ao carrinho
    document.querySelectorAll('.btn-carrinho').forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-id');
            const produtoSelecionado = produtos.find(p => p.id == id);
            if (produtoSelecionado) {
                // Adiciona ao carrinho
                if (window.adicionarAoCarrinho) {
                    window.adicionarAoCarrinho(produtoSelecionado);
                } else {
                    // Fallback: implementa localmente se carrinho.js não estiver carregado
                    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                    const idx = carrinho.findIndex(item => item.id === produtoSelecionado.id);
                    if (idx >= 0) {
                        carrinho[idx].quantidade += 1;
                    } else {
                        carrinho.push({ ...produtoSelecionado, quantidade: 1 });
                    }
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                }
                alert('Produto adicionado ao carrinho!');
            }
        };
    });

    // Evento para botão de detalhes
    document.querySelectorAll('.btn-detalhes').forEach(btn => {
        btn.onclick = (e) => {
            const id = btn.getAttribute('data-id');
            const produtoSelecionado = produtos.find(p => p.id == id);
            localStorage.setItem('produtoSelecionado', JSON.stringify(produtoSelecionado));
            window.location.href = 'detalhe-produto.html'; // Página de detalhes
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