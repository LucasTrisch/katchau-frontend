// Lista de produtos igual ao produtos.js (ou importe se possível)
const produtos = [
    {
        id: 1,
        nome: "Mouse gamer Redragon com RGB e alta precisão.",
        preco: 499.90,
        imagem: "assets/imagens/mouse.jpg",
        descricao: "Mouse gamer Redragon com iluminação RGB, alta precisão e design ergonômico."
    },
    {
        id: 2,
        nome: "Teclado Corsair Mecânico",
        preco: 449.90,
        imagem: "assets/imagens/tecladocorsair.png",
        descricao: "Teclado mecânico Corsair com switches premium e iluminação RGB."
    },
    {
        id: 3,
        nome: "Headset Quantum One,JBL",
        preco: 890.90,
        imagem: "assets/imagens/headset.jpg",
        descricao: "Headset JBL Quantum One com som surround e microfone removível."
    },
    {
        id: 4,
        nome: "Monitor 31.5'' Full HD,165Hz",
        preco: 2899.90,
        imagem: "assets/imagens/monitor.webp",
        descricao: "Monitor gamer 31.5 polegadas, resolução Full HD e 165Hz de taxa de atualização."
    },
    {
        id: 5,
        nome: "Mousepad RGB",
        preco: 99.90,
        imagem: "assets/imagens/mousepad.jpg",
        descricao: "Mousepad gamer com iluminação RGB e superfície otimizada para precisão."
    },
    {
        id: 6,
        nome: "Webcam 4K",
        preco: 500.00,
        imagem: "assets/imagens/webcam.webp",
        descricao: "Webcam 4K para streaming e videoconferências com alta qualidade de imagem."
    },
    {
        id: 7,
        nome: "Cadeira Gamer",
        preco: 1299.90,
        imagem: "assets/imagens/cadeira.webp",
        descricao: "Cadeira gamer ergonômica com ajuste de altura e apoio lombar."
    },
    {
        id: 8,
        nome: "Microfone USB",
        preco: 349.90,
        imagem: "assets/imagens/microfone.jpg",
        descricao: "Microfone USB de alta qualidade para gravações e streaming."
    },
    {
        id: 9,
        nome: "Placa de Vídeo RTX 5090",
        preco: 9000.00,
        imagem: "assets/imagens/rtx5090.webp",
        descricao: "Placa de vídeo NVIDIA RTX 5090 para máxima performance em jogos."
    }
];

function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function setCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

document.addEventListener('DOMContentLoaded', () => {
    const produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));
    if (!produtoSelecionado) return;

    // Busca detalhes do produto pelo ID no array local
    const produto = produtos.find(p => p.id === produtoSelecionado.id);
    if (!produto) {
        document.getElementById('nome-produto').innerText = 'Produto não encontrado';
        return;
    }

    document.getElementById('nome-produto').innerText = produto.nome;
    document.getElementById('preco-produto').innerText = `R$ ${produto.preco.toFixed(2)}`;
    document.getElementById('detalhe-img').src = produto.imagem;
    document.getElementById('detalhe-img').alt = produto.nome;
    document.getElementById('desc-produto').innerText = produto.descricao || 'Sem descrição disponível.';

    document.getElementById('btn-add-carrinho').onclick = () => {
        let carrinho = getCarrinho();
        const idx = carrinho.findIndex(item => item.id === produto.id);
        if (idx >= 0) {
            carrinho[idx].quantidade += 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        setCarrinho(carrinho);
        alert('Produto adicionado ao carrinho!');
    };

    // Produtos relacionados (outros produtos, exceto o atual)
    const relacionados = produtos.filter(p => p.id !== produto.id).slice(0, 4);
    const relacionadosLista = document.getElementById('relacionados-lista');
    relacionadosLista.innerHTML = '';
    relacionados.forEach(rel => {
        const card = document.createElement('div');
        card.className = 'relacionado-card';
        card.innerHTML = `
            <img src="${rel.imagem}" alt="${rel.nome}" class="relacionado-img">
            <div class="relacionado-nome">${rel.nome}</div>
            <div class="relacionado-preco">R$ ${rel.preco.toFixed(2)}</div>
            <button class="relacionado-btn">Ver Detalhes</button>
        `;
        card.querySelector('.relacionado-btn').onclick = () => {
            localStorage.setItem('produtoSelecionado', JSON.stringify(rel));
            window.location.href = 'detalhe-produto.html';
        };
        relacionadosLista.appendChild(card);
    });
});
