document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.modal .close-btn');
    const loginForm = document.getElementById('login-form');

    // Abrir modal de login
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamento padrão do link
            if (loginModal) {
                loginModal.style.display = 'block';
            }
        });
    }

    // Fechar modal de login pelo botão X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    // Fechar modal de login clicando fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Simular envio do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir envio real do formulário
            const username = document.getElementById('username').value;
            alert(`Login simulado com sucesso! Bem-vindo(a), ${username}!`);
            if (loginModal) {
                loginModal.style.display = 'none';
            }
            loginForm.reset(); // Limpar campos do formulário
        });
    }

    // Envio do formulário de cadastro para UsuarioResource
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Coleta os dados do formulário
            const nome = document.getElementById('nomeCompleto').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            // Monta o objeto UsuarioDTO
            const usuario = {
                nome: nome,
                email: email,
                senha: senha,
                cpf: document.getElementById('cpf').value,
                cep: document.getElementById('cep').value
                // Adicione outros campos se necessário
            };

            try {
                const response = await fetch('/api/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usuario)
                });

                if (response.ok) {
                    alert('Usuário cadastrado com sucesso!');
                    cadastroForm.reset();
                    window.location.href = 'login.html'; // Redireciona para a página de login
                } else {
                    alert('Erro ao cadastrar usuário.');
                }
            } catch (error) {
                alert('Erro de conexão ao cadastrar usuário.');
            }
        });
    }

    // Botão para ir para produtos (opcional)
    const produtosBtn = document.getElementById('produtos-btm');
    if (produtosBtn) {
        produtosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'produto.html';
        });
    }

    // Exemplo de interatividade para cards (pode ser expandido)
    const cards = document.querySelectorAll('.card-promocao, .card-produto');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Efeito de destaque ao passar o mouse, já tratado com CSS :hover
            // Poderia adicionar JS para efeitos mais complexos se necessário
        });
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            alert(`Você clicou em: ${title}`);
            // Aqui poderia redirecionar para uma página de detalhes do produto/promoção
        });
    });
});

