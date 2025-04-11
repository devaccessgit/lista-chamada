window.onload = () => {
    if (!localStorage.getItem('usuarios')) {
      fetch('data/exemplos.json')
        .then(r => r.json())
        .then(d => localStorage.setItem('usuarios', JSON.stringify(d.usuarios)));
    }
  };