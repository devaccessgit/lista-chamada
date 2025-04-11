function cadastrarUsuario() {
    const nome = document.getElementById('novoUsuario').value;
    const senha = document.getElementById('novaSenha').value;
    const tipo = document.getElementById('tipoUsuario').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, senha, tipo });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário cadastrado!');
  }