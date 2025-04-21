document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();

  const login = document.getElementById('login').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuario = usuarios.find(u => u.login === login && u.senha === senha);

  if (!usuario) {
    alert('Usuário ou senha inválidos.');
    return;
  }

  if (usuario.primeiroAcesso) {
    // Redireciona para alterar credenciais
    window.location.href = `alterar-credenciais.html?usuario=${usuario.login}`;
  } else {
    // Redireciona conforme o tipo
    if (usuario.tipo === 'admin') {
      window.location.href = 'admin.html';
    } else if (usuario.tipo === 'professor') {
      window.location.href = 'professor.html';
    }
  }
});