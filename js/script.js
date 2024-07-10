const form = document.getElementById('textForm');
const userText = document.getElementById('userText');
const resultArea = document.getElementById('resultArea');
const paramA = document.getElementById('paramA');
const paramB = document.getElementById('paramB');
const paramC = document.getElementById('paramC');
const valorFinal = document.getElementById('valor_final');
const loading = document.getElementById('loading');

function calcularY(x, a, b, c) {
    const expPart = Math.exp(a * (x - b));
    const y = c + ((1 - c) / (1 + expPart));
    return y.toFixed(2); 
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:8000/sintetize/' + userText.value;

    loading.style.display = 'block';
    resultArea.style.display = 'none';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            const { a, b, c } = data;

            const resultsA = `${a.toFixed(2)}`;
            const resultsB = `${b.toFixed(2)}`;
            const resultsC = `${c.toFixed(2)}`;

            const resultsValorFinal = calcularY(0.7, a, b, c);

            paramA.textContent = resultsA;
            paramB.textContent = resultsB;
            paramC.textContent = resultsC;
            valorFinal.textContent = `${resultsValorFinal}`;

            // Esconder a barra de carregamento e mostrar o resultado
            loading.style.display = 'none';
            resultArea.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao fazer requisição:', error);

            // Esconder a barra de carregamento em caso de erro
            loading.style.display = 'none';
        });
});
