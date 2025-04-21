// Pega o admin atual do localStorage
const admin = JSON.parse(localStorage.getItem('admin'));

// Verifica se admin existe
if (!admin) {
  alert('Admin não encontrado!');
  window.location.href = 'login.html';
}

// Ao submeter o formulário
document.getElementById('form-alterar-credenciais').addEventListener('submit', function(e) {
  e.preventDefault();

  const novoLogin = document.getElementById('novo-login').value;
  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  const novoAdmin = {
    login: novoLogin,
    senha: novaSenha,
    alterouCredenciais: true
  };

  localStorage.setItem('admin', JSON.stringify(novoAdmin));
  alert('Credenciais atualizadas com sucesso!');
  window.location.href = 'admin.html';
});