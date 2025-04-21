document.getElementById('form-cadastrar-professor').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senhaPadrao = 'prof123';

  // Validação dos campos
  if (!nome || !email) {
    alert('Preencha todos os campos.');
    return;
  }

  // Gerar login a partir do nome
  const login = nome.toLowerCase().replace(/\s+/g, '');

  // Recupera os professores já cadastrados
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verifica se o e-mail já está cadastrado
  if (usuarios.find(usuario => usuario.email === email)) {
    alert('Esse e-mail já está cadastrado!');
    return;
  }

  // Novo professor
  const novoProfessor = {
    nome: nome,
    email: email,
    login: login,           // Para fazer login
    senha: senhaPadrao,     // Senha padrão
    tipo: 'professor',
    primeiroAcesso: true    // Indica que é o primeiro acesso
  };

  // Adicionar professor à lista
  usuarios.push(novoProfessor);

  // Salvar lista de usuários no localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert(`Professor cadastrado com sucesso!\n\nLogin: ${login}\nSenha: ${senhaPadrao}`);
  
  // Limpar o formulário após o cadastro
  document.getElementById('form-cadastrar-professor').reset();
});