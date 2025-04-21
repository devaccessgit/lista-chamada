document.addEventListener('DOMContentLoaded', () => {
    const alterarSenhaForm = document.getElementById('alterarSenhaForm');
    
    alterarSenhaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const novaSenha = document.getElementById('nova-senha').value;
      const confirmarSenha = document.getElementById('confirmar-senha').value;
      
      if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
      
      // Salva a nova senha no localStorage ou em outro local seguro
      // Como exemplo, aqui estamos apenas salvando no localStorage
      localStorage.setItem('senha', novaSenha);
      
      // Redireciona para o dashboard após a alteração da senha
      window.location.href = 'dashboard.html';
    });
  });