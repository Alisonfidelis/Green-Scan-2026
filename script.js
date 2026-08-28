const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadContent = document.getElementById('upload-content');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const btnRemove = document.getElementById('btn-remove');
const btnAnalyze = document.getElementById('btn-analyze');
const loadingBox = document.getElementById('loading-box');
const resultBox = document.getElementById('result-box');

const detectedFood = document.getElementById('detected-food');
const estimatedTime = document.getElementById('estimated-time');
const aiRecommendation = document.getElementById('ai-recommendation');
const statusBadge = document.getElementById('status-badge');

// Banco de dados fictício expandido com mais frutas e respostas ricas
const mockAIResults = [
    {
        alimento: "Uva Niágara",
        tempo: "Consumir em até 4 dias",
        status: "bom",
        textoStatus: "Fresco / Seguro",
        recomendacao: "Engaço verde e firme detectado. Fruto bem aderido ao cacho. Mantenha em um pote fechado dentro da geladeira sem lavar, lavando apenas na hora exata de comer."
    },
    {
        alimento: "Uva Vitória",
        tempo: "Consumir em até 24 horas",
        status: "atencao",
        textoStatus: "Atenção / Muito Madura",
        recomendacao: "Algumas uvas estão se soltando facilmente do cacho e apresentando textura muito macia. Ideal para consumo imediato ou para fazer geleia caseira."
    },
    {
        alimento: "Morango Nacional",
        tempo: "Descarte Recomendado",
        status: "critico",
        textoStatus: "Crítico / Estragado",
        recomendacao: "Presença visível de mofo/bolor esbranquiçado na base da fruta. Os esporos de fungos se espalham rapidamente por toda a embalagem, descarte para sua segurança."
    },
    {
        alimento: "Morango Orgânico",
        tempo: "Consumir em até 2 dias",
        status: "bom",
        textoStatus: "Maduro Fresco",
        recomendacao: "Coloração vermelha vibrante e folhas verdes bem preservadas. Por não conter conservantes, consuma rápido ou guarde com papel toalha no fundo do pote."
    },
    {
        alimento: "Banana Prata",
        tempo: "Consumir em até 2 dias",
        status: "atencao",
        textoStatus: "Muito Madura",
        recomendacao: "A casca apresenta várias manchas escuras (açúcar concentrado). O fruto está muito doce e macio, ideal para bolos, doces ou congelamento para vitaminas."
    },
    {
        alimento: "Tomate Italiano",
        tempo: "Consumir em até 5 dias",
        status: "bom",
        textoStatus: "Fresco / Perfeito",
        recomendacao: "Firmeza ideal e casca com cor vermelha uniforme, sem pontos de bolor ou rachaduras. Armazene fora da geladeira para preservar todo o sabor original."
    },
    {
        alimento: "Maçã Gala",
        tempo: "Consumir em até 10 dias",
        status: "bom",
        textoStatus: "Excelente Estado",
        recomendacao: "Casca firme e brilhante sem nenhum sinal de amassados. Ótima durabilidade. Pode ser mantida na gaveta de frutas da geladeira por bastante tempo."
    },
    {
        alimento: "Abacate Margarida",
        tempo: "Consumir em até 48 horas",
        status: "atencao",
        textoStatus: "Pronto para Consumo",
        recomendacao: "A casca cede levemente ao toque suave dos dedos. Está no ponto perfeito para fazer guacamole ou cremes. Após aberto, guarde com o caroço para não escurecer rápido."
    },
    {
        alimento: "Laranja Pêra",
        tempo: "Consumir em até 7 dias",
        status: "bom",
        textoStatus: "Fresco",
        recomendacao: "Casca espessa, pesada e cheia de suco, sem manchas verdes amargas na superfície. Excelente para sucos naturais ricos em Vitamina C."
    }
];

// --- EVENTOS DE UPLOAD ---
dropZone.addEventListener('click', () => {
    if (previewContainer.classList.contains('hidden')) {
        fileInput.click();
    }
});

fileInput.addEventListener('change', function() {
    handleFile(this.files);
});

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
        handleFile(e.dataTransfer.files);
    }
});

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
        btnAnalyze.disabled = false;
        resultBox.classList.add('hidden');
    }
    reader.readAsDataURL(file);
}

btnRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.value = '';
    imagePreview.src = '';
    previewContainer.classList.add('hidden');
    uploadContent.classList.remove('hidden');
    btnAnalyze.disabled = true;
    resultBox.classList.add('hidden');
});

// --- SIMULAÇÃO DA IA ---
btnAnalyze.addEventListener('click', () => {
    btnAnalyze.disabled = true;
    loadingBox.classList.remove('hidden');
    resultBox.classList.add('hidden');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * mockAIResults.length);
        const data = mockAIResults[randomIndex];

        detectedFood.textContent = data.alimento;
        estimatedTime.textContent = data.tempo;
        aiRecommendation.textContent = data.recomendacao;
        
        statusBadge.textContent = data.textoStatus;
        statusBadge.className = `badge ${data.status}`;

        loadingBox.classList.add('hidden');
        resultBox.classList.remove('hidden');
        btnAnalyze.disabled = false;
    }, 2500);
});

