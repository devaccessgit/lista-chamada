// Pegar o e-mail do usuário da URL
const params = new URLSearchParams(window.location.search);
const usuario = params.get('usuario');

document.getElementById('form-alterar-senha').addEventListener('submit', function(e) {
  e.preventDefault();

  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (novaSenha === confirmarSenha) {
    // Buscar o professor no localStorage (ou banco de dados)
    const professor = JSON.parse(localStorage.getItem(usuario));

    if (professor) {
      // Atualizar a senha do professor
      professor.senha = novaSenha;
      professor.alterouSenha = true;

      // Salvar novamente no localStorage (ou banco de dados)
      localStorage.setItem(usuario, JSON.stringify(professor));

      alert('Senha alterada com sucesso!');
      window.location.href = 'professor.html'; // Redireciona para a página do professor
    }
  } else {
    alert('As senhas não coincidem!');
  }
});