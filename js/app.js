const usuario = JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: 'Professor' };
const storageKeyAlunos = `alunos_${usuario.nome}`;
const storageKeyChamadas = `chamadas_${usuario.nome}`;
const alunos = JSON.parse(localStorage.getItem(storageKeyAlunos)) || [];
const chamadas = JSON.parse(localStorage.getItem(storageKeyChamadas)) || [];

let chart = null;

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

// Funções para manipulação da tabela, histórico, chamadas, etc. (já fornecidas)