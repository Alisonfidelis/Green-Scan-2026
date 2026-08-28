// Seleção dos elementos do HTML
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadContent = document.getElementById('upload-content');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const btnRemove = document.getElementById('btn-remove');
const btnAnalyze = document.getElementById('btn-analyze');
const loadingBox = document.getElementById('loading-box');
const resultBox = document.getElementById('result-box');

// Elementos de texto do resultado
const detectedFood = document.getElementById('detected-food');
const estimatedTime = document.getElementById('estimated-time');
const aiRecommendation = document.getElementById('ai-recommendation');
const statusBadge = document.getElementById('status-badge');

// Banco de dados fictício de respostas da IA para demonstração
const mockAIResults = [
    {
        alimento: "Banana Prata",
        tempo: "Consumir em até 2 dias",
        status: "atencao",
        textoStatus: "Atenção",
        recomendacao: "A casca apresenta várias manchas escuras (açúcar concentrado). O fruto está muito maduro, ideal para o consumo imediato, produção de bolos ou congelamento para vitaminas."
    },
    {
        alimento: "Tomate Italiano",
        tempo: "Consumir em até 5 dias",
        status: "bom",
        textoStatus: "Seguro / Fresco",
        recomendacao: "Firmeza ideal e casca com cor vermelha uniforme, sem pontos de bolor ou rachaduras. Armazene local fresco e arejado fora da geladeira se quiser manter mais sabor."
    },
    {
        alimento: "Morango",
        tempo: "Descarte Recomendado",
        status: "critico",
        textoStatus: "Crítico",
        recomendacao: "Presença visível de hifas de fungo (bolor branco/cinza) em mais de um ponto da bandeja. Evite consumir, pois os esporos se espalham rapidamente por todo o alimento."
    },
    {
        alimento: "Alface Crespa",
        tempo: "Consumir em até 24 horas",
        status: "atencao",
        textoStatus: "Murchando",
        recomendacao: "Bordas das folhas levemente escurecidas e desidratadas devido à oxidação. Recomenda-se lavar bem e deixar imerso em água gelada por 15 minutos para reidratar antes de comer."
    },
    {
        alimento: "Leite Integral (Caixa)",
        tempo: "Consumir em até 3 dias",
        status: "bom",
        textoStatus: "Aberto recente",
        recomendacao: "Nenhum sinal de estufamento na embalagem. Lembre-se de manter refrigerado na prateleira interna da geladeira (nunca na porta) após aberto."
    }
];

// --- EVENTOS DE UPLOAD (Clique e Arrastar) ---

// Abrir seletor de arquivo ao clicar na caixa
dropZone.addEventListener('click', () => {
    // Só abre se não tiver nenhuma imagem sendo visualizada
    if (previewContainer.classList.contains('hidden')) {
        fileInput.click();
    }
});

// Captura do arquivo selecionado
fileInput.addEventListener('change', function() {
    handleFile(this.files[0]);
});

// Efeitos visuais de arrastar arquivo por cima da caixa
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

// Função para ler o arquivo e gerar a miniatura
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem válida.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        uploadContent.classList.add('hidden');
        previewContainer.classList.remove('hidden');
        btnAnalyze.disabled = false; // Ativa o botão de analisar
        resultBox.classList.add('hidden'); // Esconde resultados antigos se houver
    }
    reader.readAsDataURL(file);
}

// Botão para remover a imagem atual
btnRemove.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita reabrir a janela de arquivos
    fileInput.value = '';
    imagePreview.src = '';
    previewContainer.classList.add('hidden');
    uploadContent.classList.remove('hidden');
    btnAnalyze.disabled = true;
    resultBox.classList.add('hidden');
});

// --- SIMULAÇÃO DA INTELIGÊNCIA ARTIFICIAL ---

btnAnalyze.addEventListener('click', () => {
    // Exibe o painel de carregamento
    btnAnalyze.disabled = true;
    loadingBox.classList.remove('hidden');
    resultBox.classList.add('hidden');

    // Simula uma requisição de IA que demora 2.5 segundos
    setTimeout(() => {
        // Sorteia um dos diagnósticos do banco de dados
        const randomIndex = Math.floor(Math.random() * mockAIResults.length);
        const data = mockAIResults[randomIndex];

        // Atualiza a tela com os dados gerados pela "IA"
        detectedFood.textContent = data.alimento;
        estimatedTime.textContent = data.tempo;
        aiRecommendation.textContent = data.recomendacao;
        
        // Ajusta o crachá de alerta dinamicamente
        statusBadge.textContent = data.textoStatus;
        statusBadge.className = `badge ${data.status}`;

        // Esconde o carregamento e mostra a resposta final
        loadingBox.classList.add('hidden');
        resultBox.classList.remove('hidden');
        btnAnalyze.disabled = false;
    }, 2500);
});
