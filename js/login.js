document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    // Verificar se o campo de email ou senha está vazio
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Exemplo de cadastro do usuário admin no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Cadastrar usuário admin caso não exista
    if (!usuarios.find(u => u.email === 'admin@admin.com')) {
        usuarios.push({
            email: 'admin@admin.com',
            senha: btoa('admin123'), // Senha encriptada
            tipo: 'admin'
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Buscar usuário com base no email e senha fornecidos
    const usuario = usuarios.find(u => u.email === email && u.senha === btoa(senha)); // Comparar a senha encriptada

    const errorMessageDiv = document.getElementById('login-error');

    if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        // Redirecionar conforme o tipo de usuário
        if (usuario.tipo === 'admin') {
            window.location.href = 'admin.html';
        } else if (usuario.tipo === 'professor') {
            window.location.href = 'professor.html';
        } else {
            alert('Tipo de usuário desconhecido!');
        }
    } else {
        // Exibir mensagem de erro
        errorMessageDiv.style.display = 'block';
    }
});