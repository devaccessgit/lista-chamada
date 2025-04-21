document.getElementById('form-cadastrar-professor').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senhaPadrao = 'prof123';

  if (!nome || !email) {
    alert('Preencha todos os campos.');
    return;
  }

  // Gerar login a partir do nome
  const login = nome.toLowerCase().replace(/\s+/g, '');

  // Recupera os professores já cadastrados
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verifica se o e-mail já existe
  if (localStorage.getItem(email)) {
    alert('Esse e-mail já está cadastrado!');
    return;
  }

  const novoProfessor = {
    nome: nome,
    email: email,
    login: login,           // para fazer login
    senha: senhaPadrao,     // senha padrão
    tipo: 'professor',
    primeiroAcesso: true
  };

  usuarios.push(novoProfessor);

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert(`Professor cadastrado com sucesso!\n\nLogin: ${login}\nSenha: ${senhaPadrao}`);
  
  // Limpar formulário após cadastro
  document.getElementById('form-cadastrar-professor').reset();
});