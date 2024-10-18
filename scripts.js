function updateDateTime() {
    const currentDateTime = new Date();
    document.getElementById('currentDateTime').innerText = 
        currentDateTime.toLocaleString();
}

setInterval(updateDateTime, 1000);

function registrarPonto(tipo) {
    const data = new Date().toLocaleString();
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push({ tipo: tipo, data: data });
    localStorage.setItem('registros', JSON.stringify(registros));
    alert(`${capitalize(tipo)} registrada com sucesso!`);
}

function mostrarRelatorio() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const relatorio = document.getElementById('relatorio');
    relatorio.innerHTML = '<h2>Relatório de Registros</h2>';

    registros.forEach((registro, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            ${capitalize(registro.tipo)}: ${registro.data}
            <button onclick="editarRegistro(${index})">Editar</button>
        `;
        relatorio.appendChild(div);
    });
}

function editarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    const novoTipo = prompt("Edite o tipo de registro (entrada, saida, intervaloEntrada, intervaloSaida):", registros[index].tipo);
    const novaData = prompt("Edite a data e hora do registro:", registros[index].data);

    if (novoTipo && novaData) {
        registros[index] = { tipo: novoTipo, data: novaData };
        localStorage.setItem('registros', JSON.stringify(registros));
        mostrarRelatorio();
    } else {
        alert("Edição cancelada. Campos não podem ficar vazios.");
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}