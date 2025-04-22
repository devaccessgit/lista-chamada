function redefinirSenha() {
    const usuario = document.getElementById('usuario').value.trim();
    const novaSenha = document.getElementById('novaSenha').value.trim();
    const mensagem = document.getElementById('mensagem');
  
    if (!usuario || !novaSenha) {
      mensagem.innerHTML = "<span class='text-danger'>Preencha todos os campos.</span>";
      return;
    }
  
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuariosSalvos.findIndex(u => u.usuario === usuario || u.email === usuario);
  
    if (index === -1) {
      mensagem.innerHTML = "<span class='text-danger'>Usuário ou e-mail não encontrado.</span>";
      return;
    }
  
    usuariosSalvos[index].senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));
  
    mensagem.innerHTML = "<span class='text-success'>Senha redefinida com sucesso! <a href='login.html'>Ir para login</a></span>";
  }