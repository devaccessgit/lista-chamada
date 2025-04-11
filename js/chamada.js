function carregarAlunos() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const alunos = usuario.tipo === 'admin' ? ['Ana', 'Carlos', 'Beatriz'] : usuario.alunos;
    const lista = document.getElementById('listaAlunos');
    lista.innerHTML = '';
    alunos.forEach(aluno => {
      const linha = `<tr>
        <td>${aluno}</td>
        <td><input type="checkbox" /></td>
      </tr>`;
      lista.innerHTML += linha;
    });
  }
  window.onload = carregarAlunos