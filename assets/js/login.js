// Selecionar elementos do DOM
const form = document.querySelector('form');
const cpfInput = document.querySelector('input[name="cpf"]');
const passwordInput = document.querySelector('input[name="password"]');
const googleLoginButton = document.querySelector('.google-login');

// Função para validar CPF
function validateCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (ex.: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Função para exibir mensagens de erro
function showError(message) {
    alert(message); // Exibe um alerta simples (pode ser substituído por algo mais estilizado)
}

// Evento de envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const cpf = cpfInput.value.trim();
    const password = passwordInput.value.trim();

    // Validação do CPF
    if (!validateCPF(cpf)) {
        showError('CPF inválido. Por favor, insira um CPF válido.');
        return;
    }

    // Validação da senha
    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    // Se tudo estiver válido, envie o formulário
    alert('Login realizado com sucesso!');
    form.submit(); // Envia o formulário
});

// Evento para o botão de login com o Google
googleLoginButton.addEventListener('click', () => {
    alert('Redirecionando para o login com o Google...');
    // Aqui você pode adicionar a lógica para integrar com o Google OAuth
});