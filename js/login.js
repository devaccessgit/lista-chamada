// Dados de login fictícios (deve ser ajustado para banco de dados ou back-end futuramente)
const adminCredentials = {
    username: "admin",
    password: "admin123"
  };
  
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      document.getElementById("errorMessage").style.display = "block";
    }
  });