document.getElementById('form-login').addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  
  // Verificar o login do admin com credenciais padrão
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin) {
    // Se não existe dados do admin no localStorage, criar com credenciais padrão
    const dadosAdmin = {
      login: 'admin',    // Login padrão
      senha: 'admin123', // Senha padrão
      alterouCredenciais: false
    };
    localStorage.setItem('admin', JSON.stringify(dadosAdmin));
    alert('Primeiro acesso, por favor altere suas credenciais.');
    window.location.href = 'alterar-credenciais.html'; // Redireciona para alteração de credenciais
  } else {
    // Se já existe, verificar se a senha padrão está sendo utilizada
    if (usuario === admin.login && senha === admin.senha) {
      if (!admin.alterouCredenciais) {
        // Se a senha for padrão e ainda não foi alterada
        window.location.href = 'alterar-credenciais.html'; // Redireciona para alteração de credenciais
      } else {
        window.location.href = 'admin.html'; // Redireciona para a área administrativa
      }
    } else {
      alert('Login ou senha incorretos!');
    }
  }
});