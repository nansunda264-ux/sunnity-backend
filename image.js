const express = require('express');
const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        const { prompt, aspect_ratio, style } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt gambar wajib diisi.' });
        }

        // Rekayasa prompt agar kualitasnya sekelas Midjourney atau Flux Pro
        const enhancedPrompt = `${prompt}, high-fidelity render, ${style || 'photorealistic'}, studio lighting, cinematic composition, highly detailed, 8k resolution`;

        // Menggunakan engine gratisan berkualitas tinggi untuk uji coba produksi
        const encodedPrompt = encodeURIComponent(enhancedPrompt);
        const generatedImageUrl = `https://image.pollinations.ai/p/${encodedPrompt}?width=${aspect_ratio === '16:9' ? 1280 : 768}&height=${aspect_ratio === '9:16' ? 1280 : 768}&seed=${Math.floor(Math.random() * 100000)}`;

        res.json({ 
            success: true, 
            imageUrl: generatedImageUrl,
            enhancedPrompt: enhancedPrompt 
        });

    } catch (error) {
        console.error('Error pada Image API:', error);
        res.status(500).json({ error: 'Gagal membuat gambar AI.' });
    }
});

module.exports = router;
