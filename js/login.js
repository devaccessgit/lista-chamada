document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

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
        alert('Usuário ou senha inválidos!');
    }
});