const express = require('express');
const router = express.Router();
const upload = require('./upload');
const { parseFileToString } = require('./fileParser');
const { GoogleGenAI } = require('@google/genai');

// Inisialisasi AI menggunakan SDK resmi
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'MOCK_KEY' });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { message } = req.body;
        const file = req.file;

        if (!message) {
            return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
        }

        let aiContent = [];
        
        // Cek jika ada file atau gambar yang di-upload dari HP
        if (file) {
            const parsedData = await parseFileToString(file);
            if (typeof parsedData === 'object' && parsedData.inlineData) {
                // Jika file berupa gambar, masukkan format objek Vision AI
                aiContent.push(parsedData);
            } else {
                // Jika file berkas dokumen/teks
                aiContent.push(`[Isi Konteks Dokumen Terlampir]:\n${parsedData}\n\n`);
            }
        }

        // Masukkan prompt teks dari user
        aiContent.push(message);

        // Panggil model kecerdasan AI premium tingkat tinggi
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: aiContent,
            config: {
                systemInstruction: "You are NEXUS-PRO, an elite premium AI assistant. Provide exhaustive, highly professional, deeply technical, and complete answers. Never truncate code blocks."
            }
        });

        res.json({ response: response.text });

    } catch (error) {
        console.error('Error pada Chat API:', error);
        res.status(500).json({ error: 'Gagal memproses obrolan AI.' });
    }
});

module.exports = router;
