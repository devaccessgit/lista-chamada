// Verifica se o usuário logado é admin
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado || usuarioLogado.tipo !== 'admin') {
  alert('Acesso negado! Apenas administradores podem acessar.');
  window.location.href = 'index.html';
} else {
  document.getElementById('admin-nome').textContent = usuarioLogado.nome;
}

// Mostra uma seção e esconde as outras
function showSection(id) {
  document.querySelectorAll('.admin-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'professores') {
    carregarProfessores();
    carregarProfessoresDropdown();
  }

  if (id === 'alunos') {
    carregarAlunos();
  }

  if (id === 'historico') {
    carregarHistoricoDropdowns();
    carregarHistoricoChamadas();
  }   
    
  if (id === 'grafico') {
    carregarDropdownGrafico();
  }

  setLanguage(currentLanguage);  // Garantir que o idioma está certo ao carregar a página
}

// Logout
function logout() {
  localStorage.removeItem('lembrado'); // Remove o usuário lembrado
  window.location.href = 'login.html'; // Redireciona para a tela de login
}

function mostrarSucesso(mensagem) {
  alert(mensagem);  // Substitua isso por um componente de alerta mais estilizado, se desejar.
}

function mostrarErro(mensagem) {
  alert(mensagem);  // Substitua isso por um componente de alerta mais estilizado, se desejar.
}

function mostrarConfirmacao(mensagem, callback) {
  const resposta = confirm(mensagem);  // Isso pode ser substituído por um modal estilizado.
  if (resposta) {
    callback();
  }
}

// ========== Translation ==========
const translations = {
  pt: {
    "histórico": "Histórico de Chamadas",
    "filtroData": "Filtrar por Data",
    "filtroProfessor": "Filtrar por Professor",
    "filtroAluno": "Filtrar por Aluno",
    "exportarCSV": "Exportar CSV",
    "exportarPDF": "Exportar PDF",
    "graficoPresenca": "Gráfico de Presença por Aluno",
    "gerarGrafico": "Gerar Gráfico",
    "presenca": "Presente",
    "falta": "Faltou",
    "erroCadastro": "Erro ao cadastrar o aluno. Tente novamente.",
    "erroExcluir": "Erro ao excluir o aluno. Tente novamente.",
    "confirmacaoExcluir": "Tem certeza que deseja excluir este aluno?",
    "sucessoCadastro": "Aluno cadastrado com sucesso!",
    "sucessoExcluir": "Aluno excluído com sucesso!",
  },
  en: {
    "histórico": "Attendance History",
    "filtroData": "Filter by Date",
    "filtroProfessor": "Filter by Teacher",
    "filtroAluno": "Filter by Student",
    "exportarCSV": "Export CSV",
    "exportarPDF": "Export PDF",
    "graficoPresenca": "Student Attendance Graph",
    "gerarGrafico": "Generate Graph",
    "presenca": "Present",
    "falta": "Absent",
    "erroCadastro": "Error registering student. Please try again.",
    "erroExcluir": "Error deleting student. Please try again.",
    "confirmacaoExcluir": "Are you sure you want to delete this student?",
    "sucessoCadastro": "Student successfully registered!",
    "sucessoExcluir": "Student successfully deleted!",
  }
};

let currentLanguage = 'pt';  // Idioma inicial (português)

function setLanguage(language) {
  currentLanguage = language;
  const lang = translations[language];

  // Atualizar os textos no HTML
  document.getElementById('historico').querySelector('h4').textContent = lang['histórico'];
  document.getElementById('filtroData').placeholder = lang['filtroData'];
  document.getElementById('filtroProfessor').previousElementSibling.textContent = lang['filtroProfessor'];
  document.getElementById('filtroAluno').placeholder = lang['filtroAluno'];

  // Atualizar botões
  document.querySelector('button[onclick="exportarHistoricoCSV()"]').textContent = lang['exportarCSV'];
  document.querySelector('button[onclick="exportarHistoricoPDF()"]').textContent = lang['exportarPDF'];

  document.getElementById('grafico').querySelector('h4').textContent = lang['graficoPresenca'];
  document.querySelector('button[onclick="gerarGrafico()"]').textContent = lang['gerarGrafico'];

  // Atualizar legendas no gráfico de barras
  if (graficoPresenca) {
    graficoPresenca.options.plugins.title.text = lang['graficoPresenca'];
    graficoPresenca.update();
  }
}

document.getElementById('selectIdioma').addEventListener('change', function() {
  setLanguage(this.value);
});

// ========== Gestão de Professores ==========
const formProfessor = document.getElementById('formProfessor');
const listaProfessores = document.getElementById('listaProfessores');

formProfessor.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nomeProfessor').value;
  const email = document.getElementById('emailProfessor').value;
  const senha = document.getElementById('senhaProfessor').value;
  const indiceEdicao = document.getElementById('indiceEdicao').value;

  const professores = JSON.parse(localStorage.getItem('professores') || '[]');

  if (indiceEdicao !== '') {
    professores[indiceEdicao] = { nome, email, senha, tipo: 'professor' };
  } else {
    professores.push({ nome, email, senha, tipo: 'professor' });
  }

  localStorage.setItem('professores', JSON.stringify(professores));
  formProfessor.reset();
  document.getElementById('indiceEdicao').value = '';
  carregarProfessores();
});

function carregarProfessores() {
  const professores = JSON.parse(localStorage.getItem('professores') || '[]');
  listaProfessores.innerHTML = '';

  professores.forEach((prof, index) => {
    listaProfessores.innerHTML += `
      <tr>
        <td>${prof.nome}</td>
        <td>${prof.email}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProfessor(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirProfessor(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarProfessor(index) {
  const professores = JSON.parse(localStorage.getItem('professores') || '[]');
  const prof = professores[index];
  document.getElementById('nomeProfessor').value = prof.nome;
  document.getElementById('emailProfessor').value = prof.email;
  document.getElementById('senhaProfessor').value = prof.senha;
  document.getElementById('indiceEdicao').value = index;
}

function excluirProfessor(index) {
  if (confirm('Tem certeza que deseja excluir este professor?')) {
    const professores = JSON.parse(localStorage.getItem('professores') || '[]');
    professores.splice(index, 1);
    localStorage.setItem('professores', JSON.stringify(professores));
    carregarProfessores();
  }
}

// ========== Gestão de Alunos ==========
const formAluno = document.getElementById('formAluno');
const listaAlunos = document.getElementById('listaAlunos');

formAluno.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nomeAluno').value;
  const email = document.getElementById('emailAluno').value;
  const professorResponsavel = document.getElementById('professorAluno').value;
  const indiceEdicao = document.getElementById('indiceAlunoEdicao').value;

  const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');

  if (indiceEdicao !== '') {
    alunos[indiceEdicao] = { nome, email, professor: professorResponsavel };
  } else {
    alunos.push({ nome, email, professor: professorResponsavel });
  }

  localStorage.setItem('alunos', JSON.stringify(alunos));
  formAluno.reset();
  document.getElementById('indiceAlunoEdicao').value = '';
  carregarAlunos();
});

function carregarProfessoresDropdown() {
  const professores = JSON.parse(localStorage.getItem('professores') || '[]');
  const select = document.getElementById('professorAluno');
  select.innerHTML = '<option value="">Selecione um professor</option>';

  professores.forEach(prof => {
    const option = document.createElement('option');
    option.value = prof.nome;
    option.textContent = prof.nome;
    select.appendChild(option);
  });
}

function carregarAlunos() {
  const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
  listaAlunos.innerHTML = '';

  alunos.forEach((aluno, index) => {
    listaAlunos.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>${aluno.professor}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarAluno(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirAluno(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarAluno(index) {
  const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
  const aluno = alunos[index];

  document.getElementById('nomeAluno').value = aluno.nome;
  document.getElementById('emailAluno').value = aluno.email;
  document.getElementById('professorAluno').value = aluno.professor;
  document.getElementById('indiceAlunoEdicao').value = index;
}

function excluirAluno(index) {
  if (confirm('Deseja mesmo excluir este aluno?')) {
    const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    carregarAlunos();
  }
}

function carregarHistoricoDropdowns() {
  const professores = JSON.parse(localStorage.getItem('professores') || '[]');
  const filtroProfessor = document.getElementById('filtroProfessor');

  filtroProfessor.innerHTML = '<option value="">Todos os Professores</option>';
  professores.forEach(p => {
    const option = document.createElement('option');
    option.value = p.nome;
    option.textContent = p.nome;
    filtroProfessor.appendChild(option);
  });
}

function carregarHistoricoChamadas() {
  const chamadas = JSON.parse(localStorage.getItem('chamadas') || '[]');
  const tabela = document.getElementById('tabelaHistorico');
  tabela.innerHTML = '';

  chamadas.forEach(ch => {
    ch.alunos.forEach(aluno => {
      tabela.innerHTML += `
        <tr>
          <td>${ch.data}</td>
          <td>${ch.professor}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.presente ? 'Presente' : 'Faltou'}</td>
        </tr>
      `;
    });
  });
}

function filtrarHistorico() {
  const data = document.getElementById('filtroData').value;
  const professor = document.getElementById('filtroProfessor').value;
  const alunoFiltro = document.getElementById('filtroAluno').value.toLowerCase();

  const chamadas = JSON.parse(localStorage.getItem('chamadas') || '[]');
  const tabela = document.getElementById('tabelaHistorico');
  tabela.innerHTML = '';

  chamadas.forEach(ch => {
    if (data && ch.data !== data) return;
    if (professor && ch.professor !== professor) return;

    ch.alunos.forEach(aluno => {
      if (alunoFiltro && !aluno.nome.toLowerCase().includes(alunoFiltro)) return;

      tabela.innerHTML += `
        <tr>
          <td>${ch.data}</td>
          <td>${ch.professor}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.presente ? 'Presente' : 'Faltou'}</td>
        </tr>
      `;
    });
  });
}

function exportarHistoricoCSV() {
  const linhas = [['Data', 'Professor', 'Aluno', 'Status']];
  const chamadas = JSON.parse(localStorage.getItem('chamadas') || '[]');

  chamadas.forEach(ch => {
    ch.alunos.forEach(aluno => {
      linhas.push([ch.data, ch.professor, aluno.nome, aluno.presente ? 'Presente' : 'Faltou']);
    });
  });

  const csv = linhas.map(l => l.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'historico_chamada.csv';
  link.click();
}

function exportarHistoricoPDF() {
  const element = document.getElementById('tabelaHistorico').parentNode;
  const opt = {
    margin: 0.5,
    filename: 'historico_chamada.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

let graficoPresenca = null;

function gerarGrafico() {
  const professorSelecionado = document.getElementById('filtroProfessorGrafico').value;
  const chamadas = JSON.parse(localStorage.getItem('chamadas') || '[]');

  const contagem = {};

  chamadas.forEach(ch => {
    if (professorSelecionado && ch.professor !== professorSelecionado) return;

    ch.alunos.forEach(aluno => {
      if (!contagem[aluno.nome]) {
        contagem[aluno.nome] = { presentes: 0, faltas: 0 };
      }
      aluno.presente ? contagem[aluno.nome].presentes++ : contagem[aluno.nome].faltas++;
    });
  });

  const alunos = Object.keys(contagem);
  const presentes = alunos.map(a => contagem[a].presentes);
  const faltas = alunos.map(a => contagem[a].faltas);

  const ctx = document.getElementById('graficoPresenca').getContext('2d');
let graficoPresenca = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Aluno 1', 'Aluno 2', 'Aluno 3'],  // Nomes dos alunos
    datasets: [{
      label: 'Presença',
      data: [10, 8, 9],  // Número de aulas que cada aluno esteve presente
      backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      borderColor: ['#388E3C', '#F57C00', '#D32F2F'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: translations[currentLanguage].graficoPresenca
      }
    }
  }
});

function filtrarPorData() {
  const dataSelecionada = document.getElementById('filtroData').value;
  const registrosFiltrados = registros.filter(registro => registro.data === dataSelecionada);
  
  // Atualizar a exibição com os registros filtrados
  exibirRegistros(registrosFiltrados);
}

function exibirRegistros(registros) {
  let html = '';
  registros.forEach(registro => {
    html += `
      <tr>
        <td>${registro.aluno}</td>
        <td>${registro.data}</td>
        <td>${registro.presenca}</td>
      </tr>
    `;
  });
  document.getElementById('tabelaHistorico').innerHTML = html;
}

function carregarDropdownGrafico() {
  const professores = JSON.parse(localStorage.getItem('professores') || '[]');
  const dropdown = document.getElementById('filtroProfessorGrafico');

  dropdown.innerHTML = '<option value="">Todos os Professores</option>';
  professores.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.nome;
    opt.textContent = p.nome;
    dropdown.appendChild(opt);
  });
}
}