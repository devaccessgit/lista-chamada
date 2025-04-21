document.getElementById('form-login').addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  // Verificar se admin já está cadastrado
  let admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin) {
    // Se não existe admin, cria com credenciais padrão
    const dadosAdmin = {
      login: 'admin',
      senha: 'admin123',
      alterouCredenciais: false
    };
    localStorage.setItem('admin', JSON.stringify(dadosAdmin));
    alert('Primeiro acesso, por favor altere suas credenciais.');
    window.location.href = 'alterar-credenciais.html';
    return;
  }

  // Verifica se é o admin tentando logar
  if (usuario === admin.login && senha === admin.senha) {
    if (!admin.alterouCredenciais) {
      window.location.href = 'alterar-credenciais.html';
    } else {
      window.location.href = 'admin.html';
    }
    return;
  }

  // Se não é admin, verificar se é professor
  const professor = JSON.parse(localStorage.getItem(usuario));
  if (professor && senha === professor.senha) {
    if (!professor.alterouSenha) {
      window.location.href = `alterar-senha.html?usuario=${usuario}`;
    } else {
      window.location.href = 'professor.html';
    }
    return;
  }

  // Se não for admin nem professor válido
  alert('Login ou senha incorretos!');
});