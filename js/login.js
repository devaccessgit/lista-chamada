document.addEventListener("DOMContentLoaded", () => {
  const lembrar = localStorage.getItem("lembrarUsuario");
  if (lembrar) {
    const { nome, senha } = JSON.parse(lembrar);
    document.getElementById("usuarioLogin").value = nome;
    document.getElementById("senhaLogin").value = senha;
    document.getElementById("lembrarMe").checked = true;
  }
});

function toggleSenha() {
  const senhaInput = document.getElementById("senhaLogin");
  const toggle = document.querySelector(".toggle-password");
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    toggle.textContent = "Ocultar";
  } else {
    senhaInput.type = "password";
    toggle.textContent = "Mostrar";
  }
}

function loginUsuario() {
  const nome = document.getElementById("usuarioLogin").value.trim();
  const senha = document.getElementById("senhaLogin").value.trim();
  const mensagemErro = document.getElementById("mensagemErro");

  const loginBtn = document.getElementById("loginBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const lembrar = document.getElementById("lembrarMe").checked;

  // Verificação de campos obrigatórios
  if (!nome || !senha) {
    mensagemErro.textContent = "Preencha todos os campos!";
    mensagemErro.style.display = "block";
    return;
  }

  // Feedback visual de login
  btnText.textContent = "Entrando...";
  btnSpinner.style.display = "inline-block";
  loginBtn.disabled = true;
  mensagemErro.style.display = "none";

  // Simula um delay de 1 segundo
  setTimeout(() => {
    // Recupera os usuários armazenados no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Criação do usuário admin se não existir
    if (!usuarios.find(u => u.nome === "admin")) {
      usuarios.push({ nome: "admin", senha: "admin123", tipo: "admin" });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Busca o usuário que está tentando fazer login
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);

    // Verifica se o usuário foi encontrado
    if (usuario) {
      // Salva o usuário logado
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      // Verifica se o usuário marcou "lembrar-me"
      if (lembrar) {
        localStorage.setItem("lembrarUsuario", JSON.stringify({ nome, senha }));
      } else {
        localStorage.removeItem("lembrarUsuario");
      }

      // Redireciona para a página de boas-vindas
      window.location.href = "boasvindas.html";
    } else {
      // Exibe mensagem de erro caso o login falhe
      mensagemErro.textContent = "Usuário ou senha inválidos!";
      mensagemErro.style.display = "block";
      btnText.textContent = "Entrar";
      btnSpinner.style.display = "none";
      loginBtn.disabled = false;
    }
  }, 1000); // Simula o tempo de login
}