document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value.trim();

  // Verificar se o usuário é o admin
  const admin = JSON.parse(localStorage.getItem('admin'));
  
  // Verificar credenciais do admin
  if (usuario === admin.login && senha === admin.senha) {
    if (!admin.alterouCredenciais) {
      window.location.href = 'alterar-credenciais.html'; // Redireciona para a alteração de credenciais
    } else {
      window.location.href = 'admin.html'; // Redireciona para o painel do admin
    }
    return;
  }

  // Recuperar lista de usuários (professores)
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Buscar o professor pelo e-mail/login
  const professor = usuarios.find(usuario => usuario.login === usuario);

  if (professor && professor.senha === senha) {
    if (professor.primeiroAcesso) {
      // Se for o primeiro acesso, redireciona para a alteração de senha
      window.location.href = `alterar-senha.html?usuario=${professor.login}`;
    } else {
      // Se já alterou a senha, redireciona para o painel do professor
      window.location.href = 'professor.html';
    }
  } else {
    alert('Login ou senha incorretos!');
  }
});