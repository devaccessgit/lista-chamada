function gerarGraficoPresenca() {
    const presencas = chamadas.reduce((acc, chamada) => {
      const data = new Date(chamada.data).toLocaleDateString();
      if (!acc[data]) {
        acc[data] = { presente: 0, ausente: 0 };
      }
      if (chamada.status === 'presente') {
        acc[data].presente++;
      } else {
        acc[data].ausente++;
      }
      return acc;
    }, {});
  
    const datas = Object.keys(presencas);
    const presentes = datas.map(data => presencas[data].presente);
    const ausentes = datas.map(data => presencas[data].ausente);
  
    const ctx = document.getElementById('graficoPresenca').getContext('2d');
    if (chart) chart.destroy(); // Limpa o gráfico anterior
  
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: datas,
        datasets: [
          {
            label: 'Presentes',
            data: presentes,
            backgroundColor: '#28a745',
          },
          {
            label: 'Ausentes',
            data: ausentes,
            backgroundColor: '#dc3545',
          }
        ]
      }
    });
  }