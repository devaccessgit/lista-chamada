// Pegar o e-mail do usuário da URL
const params = new URLSearchParams(window.location.search);
const usuario = params.get('usuario');

document.getElementById('form-alterar-senha').addEventListener('submit', function (e) {
  e.preventDefault();

  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (novaSenha === confirmarSenha) {
    // Buscar o professor no localStorage (ou banco de dados)
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Encontrar o professor pelo login
    const professorIndex = usuarios.findIndex(professor => professor.login === usuario);

    if (professorIndex !== -1) {
      // Atualizar a senha do professor
      usuarios[professorIndex].senha = novaSenha;
      usuarios[professorIndex].primeiroAcesso = false;

      // Salvar novamente no localStorage (ou banco de dados)
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('Senha alterada com sucesso!');
      window.location.href = 'professor.html'; // Redireciona para a página do professor
    }
  } else {
    alert('As senhas não coincidem!');
  }
});