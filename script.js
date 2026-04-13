/**
 * Desenha um coração vetorial no contexto do Canvas
 */
function drawHeart(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurve = size * 0.3;
    
    ctx.moveTo(x + size / 2, y + size * 0.85);
    // Lado esquerdo do coração
    ctx.bezierCurveTo(x, y + size * 0.5, x, y, x + size / 2, y + topCurve);
    // Lado direito do coração
    ctx.bezierCurveTo(x + size, y, x + size, y + size * 0.5, x + size / 2, y + size * 0.85);
    
    ctx.fill();
}

function generateQR() {
    const titleInput = document.getElementById('qr-title');
    const title = titleInput ? titleInput.value : '';
    let text = document.getElementById('qr-text').value;
    const color = document.getElementById('qr-color').value;
    const canvas = document.getElementById('qr-canvas');
    const ctx = canvas.getContext('2d');

    if (!text) return alert("Por favor, insira um texto ou URL.");

    // Configuração do QR: Nível de correção 'H' (High) é essencial aqui
    // para que o scanner ignore as pequenas lacunas entre os corações.
    const qr = qrcode(0, 'H');
    qr.addData(text);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const cellSize = 12; // Tamanho de cada coração
    const margin = 30;
    
    // Calcula o espaço adicional para o título se ele existir
    const titleSpace = title ? 50 : 0;
    const canvasWidth = moduleCount * cellSize + (margin * 2);
    const canvasHeight = canvasWidth + titleSpace;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Re-trigger da animação de surgimento
    const wrapper = canvas.parentElement;
    wrapper.style.animation = 'none';
    wrapper.offsetHeight; // Trigger reflow
    wrapper.style.animation = null;

    // Fundo limpo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Desenhar o título se houver
    if (title) {
        ctx.fillStyle = color;
        ctx.font = "bold 24px 'Inter', sans-serif";
        ctx.textAlign = "center";
        // Adicionado limite de largura para o título não cortar
        ctx.fillText(title, canvasWidth / 2, margin + 20, canvasWidth - (margin * 2));
    }

    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                const x = col * cellSize + margin;
                const y = row * cellSize + margin + titleSpace;

                // Os 3 quadrados grandes dos cantos precisam ser sólidos para facilitar a leitura
                const isFinderPattern = 
                    (row < 7 && col < 7) || 
                    (row < 7 && col >= moduleCount - 7) || 
                    (row >= moduleCount - 7 && col < 7);

                if (isFinderPattern) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, cellSize, cellSize);
                } else {
                    drawHeart(ctx, x, y, cellSize, color);
                }
            }
        }
    }
}

function downloadQR() {
    const titleInput = document.getElementById('qr-title');
    const title = titleInput ? titleInput.value : 'qrcode';
    const canvas = document.getElementById('qr-canvas');
    const link = document.createElement('a');
    // Nome do arquivo baseado no título ou padrão
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'qrcode'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Gera o primeiro QR Code ao carregar a página
window.onload = generateQR;
