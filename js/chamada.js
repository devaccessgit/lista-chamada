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
  document.addEventListener('DOMContentLoaded', () => {
    const btnRegistrar = document.getElementById('registrar-aula');
  
    if (btnRegistrar) {
      btnRegistrar.addEventListener('click', () => {
        aulasSalvas.push(novaAula);
        localStorage.setItem('aulas', JSON.stringify(aulasSalvas));
        exibirListaAulas(); // 👈 Adicione isso logo após salvar
        alert('✅ Aula registrada com sucesso!');
        const dataAula = document.getElementById('data-aula').value;
        const nomeAluno = document.getElementById('nome-aluno').value.trim();
        const conteudo = document.getElementById('conteudo-aula').value.trim();
  
        if (!dataAula || !nomeAluno || !conteudo) {
          alert('Por favor, preencha todos os campos.');
          return;
        }
        exibirListaAulas();
        const novaAula = {
          data: dataAula,
          nome: nomeAluno,
          conteudo: conteudo
        };
  
        let aulasSalvas = JSON.parse(localStorage.getItem('aulas')) || [];
        aulasSalvas.push(novaAula);
        localStorage.setItem('aulas', JSON.stringify(aulasSalvas));
  
        alert('✅ Aula registrada com sucesso!');
        console.log(novaAula);
      });
    }
  });
  function exibirListaAulas() {
    const lista = document.getElementById('lista-aulas');
    const aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  
    if (aulas.length === 0) {
      lista.innerHTML = "<p>Nenhuma aula registrada ainda.</p>";
      return;
    }
  
    let html = "<ul class='list-group'>";
    aulas.forEach((aula, i) => {
      html += `
        <li class='list-group-item'>
          <strong>📅 ${aula.data}</strong><br>
          👤 ${aula.nome}<br>
          📘 ${aula.conteudo}
        </li>`;
    });
    html += "</ul>";
  
    lista.innerHTML = html;
  }
  window.onload = carregarAlunos