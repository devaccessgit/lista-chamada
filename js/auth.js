function login() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
    u => u.usuario === usuario && u.senha === senha
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    if (usuarioEncontrado.tipo === "admin") {
      window.location.href = "painel.html";
    } else {
      window.location.href = "chamada.html";
    }
  } else {
    alert("Usuário ou senha inválidos.");
  }
}