// Exemplo de como obter o nome do usuário (pode ser dinâmico, como de um backend ou sessionStorage)
window.onload = function() {
  const username = sessionStorage.getItem('username');  // Supondo que o nome de usuário esteja armazenado
  document.getElementById('username').textContent = username ? username : 'Usuário';
};