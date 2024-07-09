const form = document.getElementById('textForm');
const userText = document.getElementById('userText');
const resultArea = document.getElementById('resultArea');
const paramA = document.getElementById('paramA');
const paramB = document.getElementById('paramB');
const paramC = document.getElementById('paramC');
const valorFinal = document.getElementById('valor_final');

function calcularY(x, a, b, c) {
    const expPart = Math.exp(a * (x - b));
    const y = c + ((1 - c) / (1 + expPart));
    return y.toFixed(2);  // Arredonda para 2 casas decimais
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:8000/sintetize/' + userText.value;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            const { a, b, c } = data;

            const resultsA = `Parâmetro A: ${a}`;
            const resultsB = `Parâmetro B: ${b}`;
            const resultsC = `Parâmetro C: ${c}`;

            const resultsValorFinal = calcularY(0.7, a, b, c);

            paramA.textContent = resultsA;
            paramB.textContent = resultsB;
            paramC.textContent = resultsC;
            valorFinal.textContent = `TRI: ${resultsValorFinal}`;
            resultArea.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao fazer requisição:', error);
        });
});
