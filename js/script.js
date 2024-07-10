const form = document.getElementById('textForm');
const userText = document.getElementById('userText');
const resultArea = document.getElementById('resultArea');
const paramA = document.getElementById('paramA');
const paramB = document.getElementById('paramB');
const paramC = document.getElementById('paramC');
const valorFinal = document.getElementById('valor_final');
const loading = document.getElementById('loading');
const loadingBar = document.getElementById('loading-bar');

function calcularY(a, b, c) {
    const logPart = Math.log((1 - c)/(0.51 - c) - 1);
    const y = 100*((1/a)*logPart + b);
    return y.toFixed(2); 
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:8000/sintetize/' + userText.value;

    // Mostrar a barra de carregamento e inicializar a animação
    loading.style.display = 'block';
    resultArea.style.display = 'none';
    loadingBar.style.width = '0%';
    loadingBar.textContent = '0%';

    // Função para simular o progresso da barra
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        loadingBar.style.width = progress + '%';
        loadingBar.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100); 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            const { a, b, c } = data;

            const resultsA = `${a.toFixed(2)}`;
            const resultsB = `${b.toFixed(2)}`;
            const resultsC = `${c.toFixed(2)}`;

            const resultsValorFinal = calcularY(a, b, c);

            paramA.textContent = resultsA;
            paramB.textContent = resultsB;
            paramC.textContent = resultsC;
            valorFinal.textContent = `Pela análise do enunciado, espera-se que os alunos à partir do nível de proficiência ${resultsValorFinal} sejam capazes de responder a questão corretamente. Isso significa que, se você a acertou, você provavelmente está nesse nível.`;

            loading.style.display = 'none';
            resultArea.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao fazer requisição:', error);

            loading.style.display = 'none';
        });
});
