function exportarCSV() {
    const linhas = document.querySelectorAll('table tr');
    let csv = '';
    linhas.forEach(l => {
      const cols = l.querySelectorAll('td, th');
      const linha = Array.from(cols).map(c => c.innerText).join(',');
      csv += linha + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chamada.csv';
    a.click();
  }