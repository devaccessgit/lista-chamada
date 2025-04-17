// Recupera usuário e define storage keys
const usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: 'Professor' };
const storageKeyAlunos = `alunos_${usuario.nome}`;
const storageKeyChamadas = `chamadas_${usuario.nome}`;

// Carrega dados ou inicializa arrays
const alunos = JSON.parse(localStorage.getItem(storageKeyAlunos)) || [];
const chamadas = JSON.parse(localStorage.getItem(storageKeyChamadas)) || [];
let chart = null;

// Exibe nome do professor
document.getElementById("nomeProfessor").textContent = usuario.nome;

function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
}

function alternarTema() {
  document.body.classList.toggle('dark-theme');
}

function exibirNotificacao(msg, tipo) {
  document.getElementById('alert-container').innerHTML = `<div class="alert alert-${tipo}">${msg}</div>`;
}

function renderizarTabela() {
  const tabela = document.getElementById('tabelaAlunos');
  tabela.innerHTML = '';
  alunos.forEach((aluno, i) => {
    tabela.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>
        <td>
          <select onchange="atualizarStatus(${i}, this.value)" class="form-select">
            <option value="presente" ${aluno.status === 'presente' ? 'selected' : ''}>✅ Presente</option>
            <option value="ausente" ${aluno.status === 'ausente' ? 'selected' : ''}>❌ Ausente</option>
          </select>
        </td>
        <td><button class="btn btn-danger btn-sm" onclick="removerAluno(${i})">Remover</button></td>
      </tr>
    `;
  });
  gerarGraficoPresenca();
}

function adicionarAluno() {
  const nome = document.getElementById('nomeAluno').value.trim();
  if (!nome) return exibirNotificacao('Por favor, informe o nome do aluno.', 'danger');
  if (alunos.some(a => a.nome === nome)) return exibirNotificacao('Este aluno já está cadastrado.', 'danger');
  alunos.push({ nome, status: 'presente' });
  localStorage.setItem(storageKeyAlunos, JSON.stringify(alunos));
  document.getElementById('nomeAluno').value = '';
  renderizarTabela();
}

function removerAluno(index) {
  alunos.splice(index, 1);
  localStorage.setItem(storageKeyAlunos, JSON.stringify(alunos));
  renderizarTabela();
}

function atualizarStatus(index, status) {
  alunos[index].status = status;
  localStorage.setItem(storageKeyAlunos, JSON.stringify(alunos));
}

function registrarChamada() {
  const nome = document.getElementById('nomeChamada').value.trim();
  const presente = document.getElementById('presente').checked;
  const conteudo = document.getElementById('conteudoAula').value.trim();
  if (!nome || !conteudo) return exibirNotificacao('Por favor, preencha todos os campos.', 'danger');
  const aluno = alunos.find(a => a.nome === nome);
  if (!aluno) return exibirNotificacao('Aluno não encontrado.', 'danger');
  chamadas.push({
    aluno: nome,
    status: presente ? 'presente' : 'ausente',
    data: new Date().toISOString(),
    conteudo
  });
  localStorage.setItem(storageKeyChamadas, JSON.stringify(chamadas));
  exibirNotificacao('Chamada registrada com sucesso!', 'success');
  exibirHistorico();
  renderizarTabela();
}

function exibirHistorico(data = '') {
  const dataFiltrada = data 
    ? chamadas.filter(c => c.data.startsWith(data)) 
    : chamadas;
  const filtro = document.getElementById('filtroNomeAluno').value.toLowerCase();
  const historicoFinal = dataFiltrada.filter(c => c.aluno.toLowerCase().includes(filtro));
  const historicoDiv = document.getElementById('historico');
  if (!historicoFinal.length) {
    historicoDiv.innerHTML = '<p>Nenhum registro encontrado.</p>';
    return;
  }
  historicoDiv.innerHTML = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Aluno</th><th>Status</th><th>Data</th><th>Conteúdo</th>
        </tr>
      </thead>
      <tbody>
        ${historicoFinal.map(c => `
          <tr>
            <td>${c.aluno}</td>
            <td>${c.status === 'presente' ? '✅ Presente' : '❌ Ausente'}</td>
            <td>${new Date(c.data).toLocaleString()}</td>
            <td>${c.conteudo}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function limparHistorico() {
  if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
    localStorage.removeItem(storageKeyChamadas);
    chamadas.length = 0;
    exibirHistorico();
    gerarGraficoPresenca();
  }
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Histórico de Chamadas", 10, 10);
  doc.autoTable({
    head: [['Aluno','Status','Data','Conteúdo']],
    body: chamadas.map(c => [
      c.aluno,
      c.status === 'presente' ? '✅ Presente' : '❌ Ausente',
      new Date(c.data).toLocaleString(),
      c.conteudo
    ]),
  });
  doc.save("historico_chamadas.pdf");
}

function exportarCSV() {
  let csv = "Nome,Status\n";
  alunos.forEach(a => csv += `${a.nome},${a.status}\n`);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "lista_alunos.csv";
  link.click();
}

function gerarGraficoPresenca() {
  const stats = chamadas.reduce((acc, c) => {
    acc[c.aluno] = acc[c.aluno] || { presente:0, ausente:0 };
    acc[c.aluno][c.status]++;
    return acc;
  }, {});
  const labels = Object.keys(stats);
  const dataPres = labels.map(l => stats[l].presente);
  const dataAus = labels.map(l => stats[l].ausente);
  const ctx = document.getElementById('graficoPresenca').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label:'Presenças', data: dataPres, backgroundColor:'#28a745' },
        { label:'Ausências', data: dataAus, backgroundColor:'#dc3545' }
      ]
    }
  });
}

function alterarIdioma(lang) {
  const d = {
    'pt-BR': {
      cadastroAluno:'Cadastrar Aluno',
      listaAlunos:'Lista de Alunos',
      registroPresenca:'Registro de Presença',
      historicoChamadas:'Histórico de Chamadas',
      limparHistorico:'Limpar Histórico',
      graficoPresenca:'Gráfico de Presença',
      presente:'Presente', nome:'Nome', status:'Status',
      conteudo:'Conteúdo', data:'Data', acoes:'Ações'
    },
    'en': {
      cadastroAluno:'Register Student',
      listaAlunos:'Student List',
      registroPresenca:'Attendance Record',
      historicoChamadas:'Attendance History',
      limparHistorico:'Clear History',
      graficoPresenca:'Attendance Chart',
      presente:'Present', nome:'Name', status:'Status',
      conteudo:'Content', data:'Date', acoes:'Actions'
    }
  };
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = d[lang][key] || el.textContent;
  });
}

renderizarTabela();
exibirHistorico();