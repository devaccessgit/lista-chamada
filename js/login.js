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
  const nome = document.getElementById('usuarioLogin').value;
  const senha = document.getElementById('senhaLogin').value;
  const lembrar = document.getElementById('lembrarMe').checked;
  const mensagemErro = document.getElementById('mensagemErro');
  
  // Exibe o spinner e desativa o botão enquanto realiza o login
  document.getElementById('btnSpinner').style.display = 'inline-block';
  document.getElementById('loginBtn').disabled = true;
  
  // Verificação de campos obrigatórios
  if (!nome || !senha) {
    mensagemErro.textContent = "Preencha todos os campos!";
    mensagemErro.style.display = "block";
    document.getElementById('btnSpinner').style.display = 'none';
    document.getElementById('loginBtn').disabled = false;
    return;
  }

  // Feedback visual de login
  document.getElementById('btnText').textContent = "Entrando...";
  document.getElementById('btnSpinner').style.display = "inline-block";
  document.getElementById('loginBtn').disabled = true;
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

      // Redireciona para a página correspondente ao tipo de usuário
      if (usuario.tipo === "admin") {
        window.location.href = "admin.html";  // Redireciona para a página de admin
      } else if (usuario.tipo === "professor") {
        window.location.href = "professor.html";  // Redireciona para a página de professor
      } else {
        window.location.href = "boasvindas.html";  // Caso o tipo de usuário não seja identificado
      }
    } else {
      // Exibe mensagem de erro caso o login falhe
      mensagemErro.textContent = "Usuário ou senha inválidos!";
      mensagemErro.style.display = "block";
      document.getElementById('btnText').textContent = "Entrar";
      document.getElementById('btnSpinner').style.display = 'none';
      document.getElementById('loginBtn').disabled = false;
    }
  }, 1000); // Simula o tempo de login
}