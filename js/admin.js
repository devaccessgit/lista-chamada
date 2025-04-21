document.getElementById('form-cadastrar-professor').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senhaPadrao = '123456'; // Senha padrão para o primeiro acesso
  
  // Salvar o professor no localStorage (ou banco de dados)
  const professor = {
    nome: nome,
    email: email,
    senha: senhaPadrao,
    alterouSenha: false // Indica se o professor já alterou a senha
  };
  
  // Armazenar os dados do professor (em localStorage para exemplo simples)
  localStorage.setItem(email, JSON.stringify(professor));
  
  alert('Professor cadastrado com sucesso!');
  // Aqui você pode redirecionar o admin para uma tela de listagem de professores ou outra ação
});