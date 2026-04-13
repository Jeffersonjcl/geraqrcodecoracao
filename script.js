/**
 * script.js — Gerador de QR Code em Formato de Coração
 *
 * Flow:
 * 1. The user fills in text/URL and chooses colours & size.
 * 2. qrcodejs2 generates the QR matrix internally (accessed via _oQRCode).
 * 3. Each dark module whose centre falls inside the heart shape is drawn
 *    on the output canvas.  The three finder patterns are always kept so
 *    the code stays scannable.
 */

(function () {
  'use strict';

  /* ── DOM refs ─────────────────────────────────────────────── */
  const input        = document.getElementById('qr-input');
  const fgColor      = document.getElementById('fg-color');
  const bgColor      = document.getElementById('bg-color');
  const sizeSelect   = document.getElementById('qr-size');
  const generateBtn  = document.getElementById('generate-btn');
  const resultSec    = document.getElementById('result-section');
  const outputCanvas = document.getElementById('qr-canvas');
  const downloadBtn  = document.getElementById('download-btn');
  const errorMsg     = document.getElementById('error-msg');

  /* ── Heart path helper ────────────────────────────────────── */
  /**
   * Traces a heart shape into ctx that fills the square (0, 0, size, size).
   */
  function heartPath(ctx, size) {
    const w  = size;
    const h  = size;
    const cx = w / 2;           // horizontal centre
    const ty = h * 0.27;        // y of the two hump tops

    ctx.beginPath();
    ctx.moveTo(cx, ty);
    // Left hump
    ctx.bezierCurveTo(cx, 0,   0,      0,      0,      ty);
    // Left lower to bottom tip
    ctx.bezierCurveTo(0, h * 0.65,   cx - w * 0.07, h * 0.82,   cx, h);
    // Right lower from bottom tip
    ctx.bezierCurveTo(cx + w * 0.07, h * 0.82,   w, h * 0.65,   w, ty);
    // Right hump
    ctx.bezierCurveTo(w, 0,   cx, 0,   cx, ty);
    ctx.closePath();
  }

  /* ── Finder-pattern guard ─────────────────────────────────── */
  /**
   * Returns true when (col, row) belongs to one of the three 7×7 finder
   * patterns (plus the surrounding 1-cell separator row/col).
   * Finder patterns must always be drawn so the QR code is scannable.
   */
  function isFinderPattern(col, row, n) {
    const sz = 8; // 7-module finder + 1-module separator
    return (col < sz && row < sz)           // top-left
        || (col >= n - sz && row < sz)      // top-right
        || (col < sz && row >= n - sz);     // bottom-left
  }

  /* ── QR matrix from qrcodejs2 ─────────────────────────────── */
  /**
   * Creates a temporary QRCode instance (off-screen) and returns the
   * internal QRCodeModel, which exposes isDark(row, col) and
   * getModuleCount().
   */
  function buildQRModel(text) {
    const holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;left:-9999px;visibility:hidden;';
    document.body.appendChild(holder);

    let qr;
    try {
      qr = new QRCode(holder, {
        text,
        width:        1,
        height:       1,
        colorDark:    '#000000',
        colorLight:   '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch (e) {
      document.body.removeChild(holder);
      throw e;
    }

    const model = qr._oQRCode;   // QRCodeModel with isDark() & getModuleCount()
    document.body.removeChild(holder);
    return model;
  }

  /* ── Main render ──────────────────────────────────────────── */
  function generate() {
    const text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }

    errorMsg.classList.add('hidden');
    generateBtn.disabled = true;
    generateBtn.textContent = '⏳ Gerando…';

    // Use setTimeout so the UI updates before the (synchronous) work starts
    setTimeout(() => {
      try {
        const canvasSize = parseInt(sizeSelect.value, 10);

        /* 1 · Build QR matrix */
        const model = buildQRModel(text);
        const n     = model.getModuleCount();

        /* 2 · Calculate cell size with a small inner padding */
        const padding  = Math.round(canvasSize * 0.04);
        const innerSz  = canvasSize - padding * 2;
        const cellSize = innerSz / n;
        const ox       = padding;
        const oy       = padding;

        /* 3 · Set up output canvas */
        outputCanvas.width  = canvasSize;
        outputCanvas.height = canvasSize;
        const ctx = outputCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        /* 4 · Fill heart with background colour */
        ctx.save();
        heartPath(ctx, canvasSize);
        ctx.clip();
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.restore();

        /* 5 · Use an offscreen canvas for point-in-heart testing */
        const testCanvas  = document.createElement('canvas');
        testCanvas.width  = canvasSize;
        testCanvas.height = canvasSize;
        const testCtx     = testCanvas.getContext('2d');
        heartPath(testCtx, canvasSize); // build path once for isPointInPath

        /* 6 · Draw dark modules */
        ctx.fillStyle = fgColor.value;
        for (let r = 0; r < n; r++) {
          for (let c = 0; c < n; c++) {
            if (!model.isDark(r, c)) continue;

            const mx = ox + c * cellSize;
            const my = oy + r * cellSize;
            const cx = mx + cellSize / 2;
            const cy = my + cellSize / 2;

            const inHeart  = testCtx.isPointInPath(cx, cy);
            const isFinder = isFinderPattern(c, r, n);

            if (!inHeart && !isFinder) continue;

            ctx.fillRect(mx, my, cellSize - 0.5, cellSize - 0.5);
          }
        }

        /* 7 · Show result */
        resultSec.classList.remove('hidden');
        resultSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      } catch (err) {
        console.error(err);
        errorMsg.classList.remove('hidden');
        resultSec.classList.remove('hidden');
      } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = '❤️ Gerar QR Code';
      }
    }, 0);
  }

  /* ── Download ──────────────────────────────────────────────── */
  function download() {
    const link = document.createElement('a');
    link.download = 'qrcode-coracao.png';
    link.href = outputCanvas.toDataURL('image/png');
    link.click();
  }

  /* ── Event listeners ──────────────────────────────────────── */
  generateBtn.addEventListener('click', generate);
  downloadBtn.addEventListener('click', download);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') generate();
  });
}());
