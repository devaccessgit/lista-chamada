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
  if (confirm('Tem certeza que deseja excluir este aluno?')) {
    const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    carregarAlunos();
  }
}

function carregarHistoricoChamadas() {
  const chamadas = JSON.parse(localStorage.getItem('chamadas') || '[]');
  // Implementar carregamento do histórico de chamadas
}

function carregarHistoricoDropdowns() {
  carregarProfessoresDropdown();
  // Implementar dropdowns para filtros de data e aluno
}

function carregarDropdownGrafico() {
  carregarProfessoresDropdown();
}