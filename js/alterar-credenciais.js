document.getElementById('form-alterar-credenciais').addEventListener('submit', function (e) {
  e.preventDefault();

  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  let admin = JSON.parse(localStorage.getItem('admin'));

  if (admin) {
    admin.senha = novaSenha;
    admin.alterouCredenciais = true;

    localStorage.setItem('admin', JSON.stringify(admin));

    alert('Senha alterada com sucesso! Redirecionando para o painel do admin...');
    window.location.href = 'admin.html';
  } else {
    alert('Erro: Admin não encontrado.');
  }
});