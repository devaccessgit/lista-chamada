document.getElementById('exportar-pdf').addEventListener('click', () => {
  const aulas = JSON.parse(localStorage.getItem('aulas')) || [];

  if (aulas.length === 0) {
    alert('Nenhuma aula registrada ainda.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("📚 Registro de Aulas", 10, 10);

  let y = 20;
  aulas.forEach((aula, index) => {
    doc.setFontSize(12);
    doc.text(`📅 Data: ${aula.data}`, 10, y);
    doc.text(`👤 Aluno: ${aula.nome}`, 10, y + 7);
    doc.text(`📘 Conteúdo: ${aula.conteudo}`, 10, y + 14);
    y += 30;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("registro_aulas.pdf");
});