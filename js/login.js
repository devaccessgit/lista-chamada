document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuarioLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    // Verificar se o campo de nome de usuário ou senha está vazio
    if (!usuario || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Exemplo de cadastro do usuário admin no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Cadastrar usuário admin caso não exista
    if (!usuarios.find(u => u.usuario === 'admin')) {
        usuarios.push({
            usuario: 'admin',
            senha: btoa('admin123'), // Senha encriptada
            tipo: 'admin'
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Buscar usuário com base no nome de usuário e senha fornecidos
    const usuarioLogado = usuarios.find(u => u.usuario === usuario && u.senha === btoa(senha)); // Comparar a senha encriptada

    const errorMessageDiv = document.getElementById('login-error');

    if (usuarioLogado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        // Redirecionar conforme o tipo de usuário
        if (usuarioLogado.tipo === 'admin') {
            window.location.href = 'admin.html';
        } else if (usuarioLogado.tipo === 'professor') {
            window.location.href = 'professor.html';
        } else {
            alert('Tipo de usuário desconhecido!');
        }
    } else {
        // Exibir mensagem de erro
        errorMessageDiv.style.display = 'block';
    }
});