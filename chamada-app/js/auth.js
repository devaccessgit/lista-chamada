function login() {
    const nome = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      window.location.href = 'painel.html';
    } else {
      alert('Usuário ou senha inválidos!');
    }
  }