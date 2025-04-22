document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');

  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario')?.value.trim();
    const senha = document.getElementById('senha')?.value.trim();

    if (!usuario || !senha) {
      alert('Preencha todos os campos.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuarios.find(user =>
      user.login === usuario || user.email === usuario
    );

    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
      if (usuarioEncontrado.tipo === 'admin' && usuarioEncontrado.primeiroAcesso) {
        window.location.href = 'alterar-credenciais.html';
      } else if (usuarioEncontrado.tipo === 'admin') {
        window.location.href = 'admin.html';
      } else if (usuarioEncontrado.tipo === 'professor') {
        window.location.href = 'professor.html';
      } else {
        alert('Tipo de usuário não reconhecido.');
      }
    } else {
      alert('Usuário ou senha inválidos!');
    }
  });
});