document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    
    // Senha padrão (por exemplo)
    const senhaPadrao = '12345';
    
    // Verificar se a senha está correta
    if (senha !== senhaPadrao) {
      alert('Senha incorreta!');
      return;
    }
    
    // Verificar se é o primeiro login
    const isFirstLogin = localStorage.getItem(`firstLogin-${usuario}`) === null;
    
    if (isFirstLogin) {
      // Se for o primeiro login, redireciona para a página de alteração de senha
      localStorage.setItem(`firstLogin-${usuario}`, 'true');
      window.location.href = 'alterar-senha.html'; // Página para alteração de senha
    } else {
      // Caso contrário, redireciona para o dashboard
      window.location.href = 'dashboard.html';
    }
  });
});