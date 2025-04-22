document.getElementById("form-cadastro-professor").addEventListener("submit", function (e) {
  e.preventDefault();

  const login = document.getElementById("novo-login").value.trim();
  const email = document.getElementById("novo-email").value.trim();
  const senha = document.getElementById("nova-senha").value.trim();

  if (!login || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.some(u => u.login === login || u.email === email);
  if (existe) {
    alert("Usuário já existe!");
    return;
  }

  const novoProfessor = {
    login,
    email,
    senha,
    tipo: "professor"
  };

  usuarios.push(novoProfessor);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Professor cadastrado com sucesso!");

  // Limpa os campos
  document.getElementById("form-cadastro-professor").reset();
});