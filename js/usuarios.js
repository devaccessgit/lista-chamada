function cadastrarUsuario() {
  const usuario = document.getElementById("novoUsuario").value.trim();
  const senha = document.getElementById("novaSenha").value.trim();
  const tipo = document.getElementById("tipo").value;

  if (!usuario || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  const existe = usuarios.find(u => u.usuario === usuario);
  if (existe) {
    alert("Este usuário já está cadastrado.");
    return;
  }

  usuarios.push({ usuario, senha, tipo });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuário cadastrado com sucesso!");

  document.getElementById("novoUsuario").value = "";
  document.getElementById("novaSenha").value = "";
  document.getElementById("tipo").value = "professor";
}