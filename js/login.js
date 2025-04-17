function loginAdmin() {
    const email = document.getElementById('adminEmail').value.trim();
    const senha = document.getElementById('adminSenha').value.trim();
  
    const usuarioValido = email === 'admin@dominio.com' && senha === 'senhaadmin';
  
    if (usuarioValido) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('nomeAdmin', 'Administrador');
      window.location.href = 'admin.html';
    } else {
      alert('Email ou senha incorretos.');
    }
  }
  
  // Proteção contra acesso direto na admin.html (caso alguém acesse sem passar pelo login)
  function protegerAdmin() {
    const isAdmin = localStorage.getItem('adminLoggedIn');
    const nome = localStorage.getItem('nomeAdmin');
  
    if (!isAdmin) {
      alert('Acesso negado! Apenas administradores podem acessar.');
      window.location.href = 'login.html';
    } else {
      const nomeSpan = document.getElementById('nomeAdmin');
      if (nomeSpan) nomeSpan.textContent = nome || 'Admin';
    }
  }