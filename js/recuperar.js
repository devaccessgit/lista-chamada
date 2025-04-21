// Validação simples de e-mail
document.getElementById('recuperacaoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // Verifica se o e-mail é válido
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Aqui você pode fazer a lógica para enviar o link de recuperação (normalmente via backend)
    alert('Link de recuperação de senha enviado para ' + email);

    // Redireciona para a página de login após o envio
    window.location.href = "login.html";
});