document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    // Exemplo de cadastro do usuário admin no localStorage
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

if (!usuarios.find(u => u.email === 'admin@admin.com')) {
    usuarios.push({
        email: 'admin@admin.com',
        senha: 'admin123',
        tipo: 'admin'
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
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