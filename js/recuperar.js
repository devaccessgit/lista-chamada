// Validação simples de e-mail e simulação de requisição para backend
document.getElementById('recuperacaoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const statusMessage = document.getElementById('statusMessage');

    // Verifica se o e-mail é válido
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        statusMessage.textContent = 'Por favor, insira um e-mail válido.';
        statusMessage.className = 'text-danger';
        return;
    }

    // Aqui você faria uma requisição para o backend para enviar o link de recuperação.
    // Simulando com setTimeout para imitar o tempo de resposta.
    statusMessage.textContent = 'Enviando o link de recuperação...';
    statusMessage.className = 'text-info';

    // Simulação de requisição para backend
    setTimeout(function() {
        // Simulando uma resposta do servidor, como se o e-mail fosse encontrado no banco de dados
        const isEmailValid = Math.random() > 0.5;  // 50% de chance de ser válido

        if (isEmailValid) {
            // Caso o e-mail seja válido, mostramos uma mensagem de sucesso
            statusMessage.textContent = 'Link de recuperação enviado para ' + email + '. Verifique sua caixa de entrada.';
            statusMessage.className = 'text-success';
        } else {
            // Caso o e-mail não seja encontrado
            statusMessage.textContent = 'E-mail não encontrado. Por favor, verifique o e-mail digitado.';
            statusMessage.className = 'text-danger';
        }
    }, 2000);  // Simulando um tempo de espera de 2 segundos
});