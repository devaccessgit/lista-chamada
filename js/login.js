// Dados de login fictícios (deve ser ajustado para banco de dados ou back-end futuramente)
const adminCredentials = {
    username: "admin",  // Usuário fictício
    password: "admin123"  // Senha fictícia
  };
  
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Verifica se o admin está logado
    if (!localStorage.getItem("isAdminLoggedIn")) {
    window.location.href = "login.html";  // Redireciona para a página de login caso não esteja logado
    }
    // Verifica se o usuário e a senha são válidos
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Armazena o login do admin no localStorage (simulando sessão)
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "admin.html";  // Redireciona para o painel de admin
    } else {
      // Exibe uma mensagem de erro
      document.getElementById("errorMessage").style.display = "block";
    }
  });