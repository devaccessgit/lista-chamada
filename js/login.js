document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    // Credenciais válidas
    const validUsers = [
      { username: "admin", password: "1234" },
      { username: "professor", password: "abcd" }
    ];
  
    // Verificação do usuário e senha
    const validUser = validUsers.find(user => user.username === username && user.password === password);
  
    if (validUser) {
      // Armazenar sessão no localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("nomeProfessor", username); // Opcional: Armazenando o nome do usuário
      window.location.href = "painel.html"; // Redirecionamento para o painel
    } else {
      // Mostrar mensagem de erro
      document.getElementById("errorMessage").classList.remove("d-none");
    }
  });