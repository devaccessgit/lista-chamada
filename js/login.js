// JavaScript para manipulação do login, caso seja necessário

document.addEventListener('DOMContentLoaded', () => {
  // Adicionar event listener ou manipulação se necessário
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita envio padrão (caso precise de validação ou tratamento)
    // Aqui você pode fazer validação ou outras ações
    alert('Formulário enviado! (Apenas demonstração)');
    // Exemplo de redirecionamento após login (substitua conforme necessário)
    window.location.href = 'dashboard.html';
  });
});