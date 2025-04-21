document.getElementById('form-login').addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  
  // Buscar o professor no localStorage (ou banco de dados)
  const professor = JSON.parse(localStorage.getItem(usuario));

  if (professor) {
    // Verificar se a senha é a senha padrão
    if (professor.senha === senha) {
      if (!professor.alterouSenha) {
        // Se a senha for padrão, redireciona para a página de alteração de senha
        window.location.href = 'alterar-senha.html?usuario=' + usuario;
      } else {
        // Se a senha já foi alterada, redireciona para o dashboard do professor
        window.location.href = 'professor.html';
      }
    } else {
      alert('Senha incorreta!');
    }
  } else {
    alert('Usuário não encontrado!');
  }
});