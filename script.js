// Lista fixa de alunos (pode ser dinâmica futuramente)
const alunos = ['Alice', 'Bruno', 'Carlos', 'Daniela', 'Eduardo'];

// Carrega chamadas do localStorage ou cria lista vazia
let chamadas = JSON.parse(localStorage.getItem('chamadas')) || [];

// Função para mudar tema da página
function aplicarTema(tema) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${tema}-mode`);
    document.querySelector('.toggle-theme').textContent = tema === 'dark' ? '☀️' : '🌙';
  }
  
  function alternarTema() {
    const temaAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    aplicarTema(novoTema);
    localStorage.setItem('temaPreferido', novoTema);
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('temaPreferido');
    const temaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    aplicarTema(temaSalvo || temaSistema);
  });

// Função para registrar uma nova chamada
function registrarChamada() {
  const data = document.getElementById('dataChamada').value;
  if (!data) {
    alert('Selecione uma data!');
    return;
  }

  const chamada = {
    data,
    presencas: {}
  };

  alunos.forEach(nome => {
    const presente = confirm(`O aluno ${nome} está presente?`);
    chamada.presencas[nome] = presente;
  });

  chamadas.push(chamada);
  localStorage.setItem('chamadas', JSON.stringify(chamadas));
  exibirHistoricoChamadas();
}

// Função para exibir histórico de chamadas e resumo
function exibirHistoricoChamadas() {
  const container = document.getElementById('historicoChamadas');
  container.innerHTML = '';

  if (chamadas.length === 0) {
    container.innerHTML = '<p>Nenhuma chamada registrada.</p>';
    return;
  }
  
  // Gera gráfico de presença
gerarGraficoPresenca();

  // Tabelas por data
  chamadas.forEach(chamada => {
    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th colspan="2">Chamada de ${chamada.data}</th></tr><tr><th>Aluno</th><th>Status</th></tr>`;
    tabela.appendChild(thead);

    const tbody = document.createElement('tbody');
    alunos.forEach(nome => {
      const tr = document.createElement('tr');
      const status = chamada.presencas[nome] ? 'Presente' : 'Ausente';
      tr.className = chamada.presencas[nome] ? 'presente' : 'ausente';
      tr.innerHTML = `<td>${nome}</td><td>${status}</td>`;
      tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);
    container.appendChild(tabela);
  });

  // Tabela de resumo geral
  const resumo = document.createElement('div');
  resumo.innerHTML = '<h3>Resumo Geral</h3>';
  const tabelaResumo = document.createElement('table');
  const theadResumo = document.createElement('thead');
  theadResumo.innerHTML = `
    <tr>
      <th>Aluno</th>
      <th>Total Chamadas</th>
      <th>Presenças</th>
      <th>Faltas</th>
      <th>% Presença</th>
    </tr>`;
  tabelaResumo.appendChild(theadResumo);

  const tbodyResumo = document.createElement('tbody');

  alunos.forEach(nome => {
    let total = 0;
    let presencas = 0;

    chamadas.forEach(chamada => {
      if (nome in chamada.presencas) {
        total++;
        if (chamada.presencas[nome]) presencas++;
      }
    });

    const faltas = total - presencas;
    const porcentagem = total ? ((presencas / total) * 100).toFixed(1) : '0.0';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nome}</td>
      <td>${total}</td>
      <td>${presencas}</td>
      <td>${faltas}</td>
      <td>${porcentagem}%</td>
    `;
    tbodyResumo.appendChild(tr);
  });

  tabelaResumo.appendChild(tbodyResumo);
  resumo.appendChild(tabelaResumo);
  container.appendChild(resumo);
}

function gerarGraficoPresenca() {
    const ctx = document.getElementById('graficoPresenca').getContext('2d');
  
    const labels = [];
    const porcentagens = [];
  
    alunos.forEach(nome => {
      let total = 0;
      let presencas = 0;
  
      chamadas.forEach(chamada => {
        if (nome in chamada.presencas) {
          total++;
          if (chamada.presencas[nome]) presencas++;
        }
      });
  
      const porcentagem = total ? ((presencas / total) * 100).toFixed(1) : 0;
      labels.push(nome);
      porcentagens.push(porcentagem);
    });
  
    // Destroi gráfico antigo se existir
    if (window.grafico) {
      window.grafico.destroy();
    }
  
    window.grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '% de Presença',
          data: porcentagens,
          backgroundColor: '#4caf50',
          borderColor: '#388e3c',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            max: 100,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Porcentagem (%)'
            }
          }
        }
      }
    });
  }

// Executa ao carregar a página
window.onload = exibirHistoricoChamadas;