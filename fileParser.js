const fs = require('fs');

async function parseFileToString(file) {
    if (!file) return '';
    
    const mimeType = file.mimetype;
    
    // Jika file adalah teks biasa, log, atau json
    if (mimeType.startsWith('text/') || mimeType === 'application/json') {
        return fs.readFileSync(file.path, 'utf8');
    }
    
    // Jika file adalah gambar, kita kembalikan objek format base64 untuk Vision AI
    if (mimeType.startsWith('image/')) {
        const imageBuffer = fs.readFileSync(file.path);
        return {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: mimeType
            }
        };
    }
    
    // Untuk tipe file lainnya, berikan penanda teks dasar
    return `[File Terlampir: ${file.originalname} (${file.size} bytes)]`;
}

module.exports = { parseFileToString };
