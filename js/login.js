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
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const loginBtn = document.getElementById('loginBtn');

  // Verificação de campos obrigatórios
  if (!nome || !senha) {
    mensagemErro.textContent = "Preencha todos os campos!";
    mensagemErro.style.display = "block";
    return;
  }

  // Feedback visual
  btnText.textContent = "Entrando...";
  btnSpinner.style.display = "inline-block";
  loginBtn.disabled = true;
  mensagemErro.style.display = "none";

  setTimeout(() => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona usuário admin se não existir
    if (!usuarios.find(u => u.nome === "admin")) {
      usuarios.push({ nome: "admin", senha: "admin123", tipo: "admin" });
      usuarios.push({ nome: "professor", senha: "12345", tipo: "professor" });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Busca o usuário
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      if (lembrar) {
        localStorage.setItem("lembrarUsuario", JSON.stringify({ nome, senha }));
      } else {
        localStorage.removeItem("lembrarUsuario");
      }

      // Redirecionamento com base no tipo de usuário
      if (usuario.tipo === "admin") {
        window.location.href = "admin.html";
      } else if (usuario.tipo === "professor") {
        window.location.href = "professor.html";
      } else {
        window.location.href = "boasvindas.html";
      }

    } else {
      // Erro de login
      mensagemErro.textContent = "Usuário ou senha inválidos!";
      mensagemErro.style.display = "block";
      btnText.textContent = "Entrar";
      btnSpinner.style.display = "none";
      loginBtn.disabled = false;
    }
  }, 1000);
}