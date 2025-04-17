document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const validUser = "admin";
    const validPass = "1234";
  
    if (username === validUser && password === validPass) {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      document.getElementById("errorMessage").classList.remove("d-none");
    }
  });