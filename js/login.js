// Espera o DOM carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');
  
  // Quando o formulário for submetido
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o envio do formulário tradicional

    // Obtém os valores do formulário
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Recupera os dados dos usuários (admin e professores) salvos no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Tenta localizar o usuário no localStorage (usando login ou email)
    const usuarioEncontrado = usuarios.find(user => (user.login === usuario || user.email === usuario));

    // Verifica se o usuário foi encontrado e se a senha corresponde
    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {

      // Verifica se é o primeiro acesso do admin
      if (usuarioEncontrado.tipo === 'admin' && usuarioEncontrado.primeiroAcesso) {
        // Caso o admin esteja acessando pela primeira vez, redireciona para alterar senha
        window.location.href = 'alterar-credenciais.html';
      } else if (usuarioEncontrado.tipo === 'admin') {
        // Se o login for de admin e a senha estiver alterada, vai para o portal do admin
        window.location.href = 'admin.html';
      } else if (usuarioEncontrado.tipo === 'professor') {
        // Se for um professor, vai para o portal do professor
        window.location.href = 'professor.html';
      }
    } else {
      // Se o login ou senha estiverem incorretos
      alert('Usuário ou senha inválidos!');
    }
  });
});