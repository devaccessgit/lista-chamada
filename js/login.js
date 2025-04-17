document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const validAdminUser = "admin";
    const validAdminPass = "1234";
    const validProfessorUser = "professor";
    const validProfessorPass = "abcd"; // Exemplo de senha para o professor, altere conforme necessário

    // Verificar se o login é de admin
    if (username === validAdminUser && password === validAdminPass) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin.html";
    }
    // Verificar se o login é de professor
    else if (username === validProfessorUser && password === validProfessorPass) {
        localStorage.setItem("isProfessorLoggedIn", "true");
        window.location.href = "professor.html";
    } else {
        document.getElementById("errorMessage").classList.remove("d-none");
    }
});