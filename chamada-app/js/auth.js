// Função para cadastrar usuário com tipo
function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipo").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // Verifica se o e-mail já existe
  const existe = usuarios.some(user => user.email === email);
  if (existe) {
    alert("Já existe um usuário com esse e-mail.");
    return;
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email,
    senha,
    tipo // "admin" ou "professor"
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuário cadastrado com sucesso!");
  window.location.href = "index.html";
}