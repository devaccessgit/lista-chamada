// Carrega usuário e storage keys
const usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: 'Professor' };
const storageKeyAlunos = `alunos_${usuario.nome}`;
const storageKeyChamadas = `chamadas_${usuario.nome}`;

// Carrega dados
const alunos = JSON.parse(localStorage.getItem(storageKeyAlunos)) || [];
const chamadas = JSON.parse(localStorage.getItem(storageKeyChamadas)) || [];
let chart = null;

// Exibe nome do professor
document.getElementById("nomeProfessor").textContent = usuario.nome;

// Lembra idioma
const savedLang = localStorage.getItem('lang') || 'pt-BR';
document.getElementById('lang').value = savedLang;

// Traduções
const dict = {
  'pt-BR': {
    painel: "Painel do Professor",
    textoProfessor: "Professor logado:",
    sair: "Sair",
    cadastroAluno: "Cadastrar Aluno",
    listar: "Lista de Alunos",
    registroPresenca: "Registro de Presença",
    historicoChamadas: "Histórico de Chamadas",
    limparHistorico: "Limpar Histórico",
    graficoPresenca: "Gráfico de Presença",
    presente: "Presente",
    nome: "Nome",
    status: "Status",
    acoes: "Remover",
    exportPDF: "Exportar PDF",
    exportCSV: "Exportar CSV",
    cadastrar: "Cadastrar",
    registrarChamada: "Registrar Chamada",
    placeholderNomeAluno: "Nome do aluno",
    placeholderConteudoAula: "Conteúdo da aula",
    placeholderFiltro: "Filtrar por nome do aluno"
  },
  'en': {
    painel: "Teacher Panel",
    textoProfessor: "Logged in as:",
    sair: "Logout",
    cadastroAluno: "Register Student",
    listaAlunos: "Student List",
    registroPresenca: "Attendance Record",
    historicoChamadas: "Attendance History",
    limparHistorico: "Clear History",
    graficoPresenca: "Attendance Chart",
    presente: "Present",
    nome: "Name",
    status: "Status",
    acoes: "Remover",
    exportPDF: "Export PDF",
    exportCSV: "Export CSV",
    cadastrar: "Register",
    registrarChamada: "Register Attendance",
    placeholderNomeAluno: "Student name",
    placeholderConteudoAula: "Lesson content",
    placeholderFiltro: "Filter by student name"
  }
};

// Aplica idioma
function alterarIdioma(lang) {
    localStorage.setItem('lang', lang);
    const t = dict[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });
  }
  alterarIdioma(savedLang);
  
  // Alterna tema
function alternarTema() {
    document.body.classList.toggle('dark-theme');
  }
  
  // Notificação
  function exibirNotificacao(msg, tipo) {
    const c = document.getElementById('alert-container');
    c.innerHTML = `<div class="alert alert-${tipo}">${msg}</div>`;
    setTimeout(() => c.innerHTML = '', 3000);
  }
  
  // Logout
  function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
  }
  
  // Exibe tabela de alunos
  function renderizarTabela() {
    const tabela = document.getElementById('tabelaAlunos');
    tabela.innerHTML = '';
    alunos.forEach((a, i) => {
      tabela.innerHTML += `
        <tr>
          <td>${a.nome}</td>
          <td>
            <select onchange="atualizarStatus(${i}, this.value)" class="form-select">
              <option value="presente" ${a.status === 'presente' ? 'selected' : ''}>✅ ${dict[savedLang].presente}</option>
              <option value="ausente" ${a.status === 'ausente' ? 'selected' : ''}>❌ ${dict[savedLang].status}</option>
            </select>
          </td>
          <td><button class="btn btn-danger btn-sm" onclick="removerAluno(${i})">${dict[savedLang].acoes}</button></td>
        </tr>`;
    });
  }
  
  // Adiciona aluno
  function adicionarAluno() {
    const nome = document.getElementById('nomeAluno').value.trim();
    if (!nome) return exibirNotificacao('Informe o nome.', 'danger');
    if (alunos.some(a => a.nome === nome)) return exibirNotificacao('Já cadastrado.', 'danger');
    alunos.push({ nome, status: 'presente' });
    localStorage.setItem(storageKeyAlunos, JSON.stringify(alunos));
    document.getElementById('nomeAluno').value = '';
    renderizarTabela();
  }
  
  // Atualiza status
  function atualizarStatus(i, status) {
    alunos[i].status = status;
    localStorage.setItem(storageKeyAlunos, JSON.stringify(alunos));
  }
  
  // Remove aluno
  function removerAluno(i) {
    alunos.splice(i, 1);
    localStorage.setItem(storageKeyAlunos, JSON.stringify(alunos));
    renderizarTabela();
  }
  
  // Registra chamada (impede não cadastrados)
  function registrarChamada() {
    const nome = document.getElementById('nomeChamada').value.trim();
    const pres = document.getElementById('presente').checked;
    const cont = document.getElementById('conteudoAula').value.trim();
    if (!nome || !cont) return exibirNotificacao('Preencha todos os campos.', 'danger');
    if (!alunos.some(a => a.nome === nome)) return exibirNotificacao('Aluno não encontrado.', 'danger');
    chamadas.push({ aluno: nome, status: pres ? 'presente' : 'ausente', conteudo: cont, data: new Date().toISOString() });
    localStorage.setItem(storageKeyChamadas, JSON.stringify(chamadas));
    exibirNotificacao('Registrado com sucesso!', 'success');
    atualizarExibicoes();
  }
  
  // Exibe histórico com filtros
  function exibirHistorico(date = '') {
    const filtroNome = document.getElementById('filtroNomeAluno').value.trim().toLowerCase();
    let arr = chamadas.filter(c => !date || c.data.startsWith(date));
    arr = arr.filter(c => c.aluno.toLowerCase().includes(filtroNome));
    const div = document.getElementById('historico');
    if (!arr.length) {
      div.innerHTML = `<p>Nenhum registro encontrado.</p>`;
    } else {
      let html = `<table class="table table-striped"><thead><tr>
        <th>${dict[savedLang].nome}</th>
        <th>${dict[savedLang].status}</th>
        <th>${dict[savedLang].data}</th>
        <th>${dict[savedLang].conteudo}</th>
      </tr></thead><tbody>`;
      arr.forEach(c => {
        html += `<tr>
          <td>${c.aluno}</td>
          <td>${c.status === 'presente' ? '✅' : '❌'}</td>
          <td>${new Date(c.data).toLocaleString()}</td>
          <td>${c.conteudo}</td>
        </tr>`;
      });
      html += `</tbody></table>`;
      div.innerHTML = html;
    }
  }
  
  // Limpa histórico
  function limparHistorico() {
    if (confirm('Confirma limpar histórico?')) {
      chamadas.length = 0;
      localStorage.removeItem(storageKeyChamadas);
      atualizarExibicoes();
    }
  }
  
  // Exporta histórico em PDF
  function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(dict[savedLang].historicoChamadas, 10, 10);
    doc.autoTable({
      head: [[
        dict[savedLang].nome,
        dict[savedLang].status,
        dict[savedLang].data,
        dict[savedLang].conteudo
      ]],
      body: chamadas.map(c => [
        c.aluno,
        c.status === 'presente' ? 'Presente' : 'Ausente',
        new Date(c.data).toLocaleString(),
        c.conteudo
      ])
    });
    doc.save("historico_chamadas.pdf");
  }
  
  // Exporta histórico de chamadas em CSV
  function exportarCSV() {
    // Obtém filtros atuais
    const date = document.getElementById('dataSelecionada').value;
    const filtroNome = document.getElementById('filtroNomeAluno').value.trim().toLowerCase();
  
    // Filtra o histórico como na exibição
    let arr = chamadas.filter(c => !date || c.data.startsWith(date));
    arr = arr.filter(c => c.aluno.toLowerCase().includes(filtroNome));
  
    // Cabeçalho do CSV
    let csv = `${dict[savedLang].nome},${dict[savedLang].status},${dict[savedLang].data},${dict[savedLang].conteudo}\n`;
  
    // Linhas do CSV
    arr.forEach(c => {
      csv += [
        c.aluno,
        c.status === 'presente' ? 'Presente' : 'Ausente',
        new Date(c.data).toLocaleString(),
        c.conteudo
      ].join(',') + '\n';
    });
  
    // Cria o blob e o link de download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'historico_chamadas.csv';
    link.style.display = 'none';
  
    // Anexa, clica e remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Gera gráfico de presença por aluno com filtros
function gerarGraficoPresenca() {
    const date = document.getElementById('dataSelecionada').value;
    const nomeFilter = document.getElementById('filtroNomeAluno').value.trim().toLowerCase();
    let arr = chamadas.filter(c => !date || c.data.startsWith(date));
    arr = arr.filter(c => c.aluno.toLowerCase().includes(nomeFilter));
  
    if (!arr.length) {
      if (chart) chart.destroy();
      return;
    }
    const stats = {};
    arr.forEach(c => {
      stats[c.aluno] = stats[c.aluno] || { presente: 0, ausente: 0 };
      stats[c.aluno][c.status]++;
    });
    const labels = Object.keys(stats);
    const dataP = labels.map(l => stats[l].presente);
    const dataA = labels.map(l => stats[l].ausente);
    const ctx = document.getElementById('graficoPresenca').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [
        { label: dict[savedLang].presente, data: dataP, backgroundColor: '#28a745' },
        { label: dict[savedLang].status, data: dataA, backgroundColor: '#dc3545' }
      ] }
    });
  }
  
  // Atualiza histórico e gráfico sem recarregar página
  function atualizarExibicoes() {
    const date = document.getElementById('dataSelecionada').value;
    exibirHistorico(date);
    gerarGraficoPresenca();
  }
  
  // Liga eventos de filtro de data e nome
  document.getElementById('dataSelecionada').addEventListener('change', atualizarExibicoes);
  document.getElementById('filtroNomeAluno').addEventListener('input', atualizarExibicoes);
  
  // Inicialização
  renderizarTabela();
  atualizarExibicoes();