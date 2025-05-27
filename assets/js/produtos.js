// Busca produtos do backend
async function buscarProdutos() {
    try {
        const response = await fetch('/api/produtos');
        const produtos = await response.json();
        renderizarProdutos(produtos);
    } catch (e) {
        document.querySelector('.produtos-lista').innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

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
            <button class="produto-nome-btn" data-id="${produto.id}" style="background:none;border:none;color:#a93226;font-size:1.1rem;font-weight:700;cursor:pointer;text-decoration:underline;margin-bottom:6px;">${produto.nome}</button>
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

    // Evento para nome do produto como botão (vai para detalhes)
    document.querySelectorAll('.produto-nome-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = btn.getAttribute('data-id');
            const produtoSelecionado = produtos.find(p => p.id == id);
            localStorage.setItem('produtoSelecionado', JSON.stringify(produtoSelecionado));
            window.location.href = 'detalhe-produto.html';
        };
    });
}

// Função de pesquisa
function pesquisarProdutos(termo, produtos) {
    const termoLower = termo.toLowerCase();
    return produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termoLower)
    );
}

// Evento de pesquisa
document.addEventListener('DOMContentLoaded', async () => {
    let produtos = [];
    try {
        const response = await fetch('/api/produtos');
        produtos = await response.json();
    } catch (e) {
        document.querySelector('.produtos-lista').innerHTML = '<p>Erro ao carregar produtos.</p>';
        return;
    }
    renderizarProdutos(produtos);

    const formPesquisa = document.querySelector('.header-search');
    if (formPesquisa) {
        formPesquisa.addEventListener('submit', function(e) {
            e.preventDefault();
            const termo = formPesquisa.querySelector('.search-input').value;
            const resultados = pesquisarProdutos(termo, produtos);
            renderizarProdutos(resultados);
        });
    }
});