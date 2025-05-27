// Carrinho armazenado no localStorage
function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function setCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function renderizarCarrinho() {
    const carrinho = getCarrinho();
    const container = document.getElementById('carrinho-itens');
    const totalSpan = document.getElementById('carrinho-total');
    container.innerHTML = '';

    if (carrinho.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#a93226;">Seu carrinho está vazio.</p>';
        totalSpan.textContent = 'Total: R$ 0,00';
        return;
    }

    let total = 0;
    carrinho.forEach((item, idx) => {
        total += item.preco * item.quantidade;
        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" class="produto-img">
            <span class="carrinho-nome">${item.nome}</span>
            <span class="carrinho-preco">R$ ${item.preco.toFixed(2)}</span>
            <span class="carrinho-quantidade">
                <button class="btn-menos" data-idx="${idx}">-</button>
                <span>${item.quantidade}</span>
                <button class="btn-mais" data-idx="${idx}">+</button>
            </span>
            <button class="btn-remover" data-idx="${idx}">Remover</button>
        `;
        container.appendChild(div);
    });
    totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Eventos de quantidade
    container.querySelectorAll('.btn-mais').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            carrinho[idx].quantidade++;
            setCarrinho(carrinho);
            renderizarCarrinho();
        };
    });
    container.querySelectorAll('.btn-menos').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            if (carrinho[idx].quantidade > 1) {
                carrinho[idx].quantidade--;
            }
            setCarrinho(carrinho);
            renderizarCarrinho();
        };
    });
    // Remover produto
    container.querySelectorAll('.btn-remover').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            carrinho.splice(idx, 1);
            setCarrinho(carrinho);
            renderizarCarrinho();
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();
    const btnPagamento = document.getElementById('btn-pagamento');
    if (btnPagamento) {
        btnPagamento.onclick = () => {
            const carrinho = getCarrinho();
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            alert('Pagamento realizado com sucesso!');
            setCarrinho([]);
            renderizarCarrinho();
        };
    }
});
