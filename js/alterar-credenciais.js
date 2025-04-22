document.getElementById('form-alterar-senha').addEventListener('submit', function (e) {
  e.preventDefault();

  // Pegando os valores dos campos de senha
  const senhaAntiga = document.getElementById('senha-antiga').value.trim();
  const novaSenha = document.getElementById('nova-senha').value.trim();
  const confirmarSenha = document.getElementById('confirmar-senha').value.trim();

  // Verificando se a nova senha e a confirmação são iguais
  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  // Verificando se a senha antiga está correta (no exemplo, vamos pegar do localStorage)
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.primeiroAcesso === true); // Usuário que está realizando o primeiro acesso

  if (!usuario || usuario.senha !== senhaAntiga) {
    alert('Senha antiga incorreta!');
    return;
  }

  // Atualizando a senha
  usuario.senha = novaSenha;
  usuario.primeiroAcesso = false; // Marcando como não é mais o primeiro acesso

  // Salvando as alterações no localStorage
  const index = usuarios.indexOf(usuario);
  usuarios[index] = usuario;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Senha alterada com sucesso!');

  // Redireciona para a página de login
  window.location.href = 'login.html';
});