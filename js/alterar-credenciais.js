document.getElementById('form-alterar-credenciais').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const novoLogin = document.getElementById('novo-login').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
  
    if (novaSenha === confirmarSenha) {
      const admin = JSON.parse(localStorage.getItem('admin'));
  
      if (admin) {
        // Atualizar login e senha
        admin.login = novoLogin;
        admin.senha = novaSenha;
        admin.alterouCredenciais = true;
  
        // Salvar os novos dados no localStorage
        localStorage.setItem('admin', JSON.stringify(admin));
  
        alert('Credenciais alteradas com sucesso!');
        window.location.href = 'admin.html'; // Redireciona para a área administrativa
      }
    } else {
      alert('As senhas não coincidem!');
    }
  });