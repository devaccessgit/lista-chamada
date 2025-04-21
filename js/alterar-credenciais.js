document.getElementById('form-alterar-credenciais').addEventListener('submit', function (e) {
  e.preventDefault();

  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (usuarioLogado.tipo === 'admin') {
    const admin = JSON.parse(localStorage.getItem('admin'));
    admin.senha = novaSenha;
    admin.alterouCredenciais = true;
    localStorage.setItem('admin', JSON.stringify(admin));
    alert('Senha do admin alterada com sucesso!');
    window.location.href = 'index.html';
  } else if (usuarioLogado.tipo === 'professor') {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.login === usuarioLogado.login);
    if (index !== -1) {
      usuarios[index].senha = novaSenha;
      usuarios[index].primeiroAcesso = false;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Senha alterada com sucesso!');
      window.location.href = 'index.html';
    }
  }
});