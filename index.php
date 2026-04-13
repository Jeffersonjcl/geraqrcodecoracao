<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de QR Code Love</title>
    <link rel="stylesheet" href="style.css">
    <!-- Biblioteca leve para gerar a matriz de dados do QR Code -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
</head>
<body>
    <div class="card">
        <h1>QR Code CPS 2026.1 ❤️</h1>
        <p>Transforme texto ou links em um QR Code cheio de amor.</p>
        
        <div class="controls">
            <input type="text" id="qr-title" placeholder="Título acima do QR Code (opcional)">
            <textarea id="qr-text" placeholder="Digite seu link ou texto longo aqui..." rows="5">https://google.com</textarea>
            <div class="color-picker">
                <label for="qr-color">Cor:</label>
                <input type="color" id="qr-color" value="#ff4d6d">
            </div>
            <button onclick="generateQR()" class="btn-generate">Gerar QR Code</button>
        </div>
        
        <div class="canvas-wrapper">
            <canvas id="qr-canvas"></canvas>
        </div>
        
        <button id="download-btn" onclick="downloadQR()" class="btn-download">Baixar Imagem (.png)</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
