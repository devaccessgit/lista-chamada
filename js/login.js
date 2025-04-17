function loginUsuario() {
  const nome = document.getElementById('usuarioLogin').value.trim();
  const senha = document.getElementById('senhaLogin').value.trim();
  const mensagemErro = document.getElementById('mensagemErro');

  const loginBtn = document.getElementById('loginBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');

  // Ativa o carregamento
  btnText.textContent = 'Entrando...';
  btnSpinner.style.display = 'inline-block';
  loginBtn.disabled = true;

  // Simula processamento
  setTimeout(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Cria admin se ainda não existir
    if (!usuarios.find(u => u.nome === 'admin')) {
      usuarios.push({ nome: 'admin', senha: 'admin123', tipo: 'admin' });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);

    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      // Redireciona conforme o tipo de usuário
      if (usuario.tipo === 'admin') {
        window.location.href = 'admin.html';
      } else if (usuario.tipo === 'professor') {
        window.location.href = 'index.html';
      } else {
        window.location.href = 'boasvindas.html'; // fallback opcional
      }
    } else {
      mensagemErro.textContent = 'Usuário ou senha inválidos!';
      mensagemErro.style.display = 'block';

      // Reseta o botão
      btnText.textContent = 'Entrar';
      btnSpinner.style.display = 'none';
      loginBtn.disabled = false;
    }
  }, 1000); // 1 segundo de simulação
}