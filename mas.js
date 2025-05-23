function calcularAhorro() {
    const consumo = parseFloat(document.getElementById("consumo").value);
    const costoKwh = parseFloat(document.getElementById("costoKwh").value);

    if (Number.isNaN(consumo) || Number.isNaN(costoKwh) || consumo <= 0 || costoKwh <= 0) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    const costoMensual = consumo * costoKwh;
    const costoAnual = costoMensual * 12;
    const panelesNecesarios = Math.ceil(consumo / 30);
    const costoSistema = panelesNecesarios * 300 * 1.5;
    const ahorroAnual = costoAnual * 0.8;
    const retorno = Math.ceil(costoSistema / ahorroAnual);

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    });

    document.getElementById("resultadoTexto").innerHTML = `
💰 <strong>Costo Mensual:</strong> ${formatter.format(costoMensual)}<br/>
📦 <strong>Paneles Necesarios:</strong> ${panelesNecesarios}<br/>
💵 <strong>Costo Sistema:</strong> ${formatter.format(costoSistema)}<br/>
🌞 <strong>Ahorro Anual:</strong> ${formatter.format(ahorroAnual)}<br/>
⏳ <strong>Retorno:</strong> ${retorno} años`;

    if (window.graficaBarra instanceof Chart) {
        window.graficaBarra.destroy();
    }
    if (window.graficaTorta instanceof Chart) {
        window.graficaTorta.destroy();
    }
    if (window.graficaLinea instanceof Chart) {
        window.graficaLinea.destroy();
    }
    if (window.graficaDoughnut instanceof Chart) {
        window.graficaDoughnut.destroy();
    }

    const ctxBarra = document.getElementById("graficaBarra").getContext("2d");
    window.graficaBarra = new Chart(ctxBarra, {
        type: "bar",
        data: {
            labels: ["Costo Anual", "Ahorro Anual"],
            datasets: [{
                label: "Comparativa",
                data: [costoAnual, ahorroAnual],
                backgroundColor: ["rgba(133, 99, 255, 0.6)", "rgba(205, 50, 202, 0.6)"]
            }]
        }
    });

    const ctxTorta = document.getElementById("graficaTorta").getContext("2d");
    window.graficaTorta = new Chart(ctxTorta, {
        type: "pie",
        data: {
            labels: ["Costo Anual", "Ahorro Anual"],
            datasets: [{
                data: [costoAnual, ahorroAnual],
                backgroundColor: ["rgba(133, 99, 255, 0.6)", "rgba(205, 50, 202, 0.6)"]
            }]
        }
    });

    const ctxLinea = document.getElementById("graficaLinea").getContext("2d");
    window.graficaLinea = new Chart(ctxLinea, {
        type: "line",
        data: {
            labels: ["Costo Anual", "Ahorro Anual"],
            datasets: [{
                label: "Evolución",
                data: [costoAnual, ahorroAnual],
                borderColor: "rgba(133, 99, 255, 0.6)",
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const ctxDoughnut = document.getElementById("graficaDoughnut").getContext("2d");
    window.graficaDoughnut = new Chart(ctxDoughnut, {
        type: "doughnut",
        data: {
            labels: ["Costo Anual", "Ahorro Anual"],
            datasets: [{
                label: "Distribución",
                data: [costoAnual, ahorroAnual],
                backgroundColor: ["rgba(133, 99, 255, 0.6)", "rgba(205, 50, 202, 0.6)"],
                hoverOffset: 10
            }]
        }        
    });
}