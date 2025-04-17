// Função chamada ao submeter o login
function loginAdmin() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;
  
    // Verifique as credenciais (aqui estou usando um exemplo simples)
    const usuarioValido = email === 'admin@dominio.com' && senha === 'senhaadmin';
  
    if (usuarioValido) {
      // Salvar informações do admin no localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('nomeAdmin', 'Administrador');  // Exemplo de nome do admin
  
      // Redirecionar para a página do painel do administrador
      window.location.href = 'admin.html';
    } else {
      // Exibe uma mensagem de erro se as credenciais estiverem erradas
      alert('Credenciais inválidas');
    }
  }
  
  // Função para verificar se o usuário está logado
  window.onload = function() {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    
    // Se o admin estiver logado, redireciona diretamente para o painel do admin
    if (loggedIn) {
      window.location.href = 'admin.html';
    }
  };