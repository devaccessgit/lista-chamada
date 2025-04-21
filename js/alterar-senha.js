// Pegar o login do usuário da URL
const params = new URLSearchParams(window.location.search);
const login = params.get('usuario');

document.getElementById('form-alterar-senha').addEventListener('submit', function (e) {
  e.preventDefault();

  const novaSenha = document.getElementById('nova-senha').value.trim();
  const confirmarSenha = document.getElementById('confirmar-senha').value.trim();

  if (!novaSenha || !confirmarSenha) {
    alert('Preencha todos os campos.');
    return;
  }

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioIndex = usuarios.findIndex(u => u.login === login);

  if (usuarioIndex !== -1) {
    usuarios[usuarioIndex].senha = novaSenha;
    usuarios[usuarioIndex].primeiroAcesso = false;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Senha alterada com sucesso!');

    // Redirecionar para a página correta
    const tipo = usuarios[usuarioIndex].tipo;
    if (tipo === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'professor.html';
    }
  } else {
    alert('Usuário não encontrado.');
  }
});