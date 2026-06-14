const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate', async (req, res) => {
    try {
        const { prompt, duration, instrumental } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt atau deskripsi musik wajib diisi.' });
        }

        // Cek apakah API Key Suno tersedia di file .env
        const sunoKey = process.env.SUNO_API_KEY;
        if (!sunoKey || sunoKey.includes('your-suno-api-key')) {
            // Mode Simulasi/Demo jika key belum diisi, memberikan sampel audio berkualitas
            console.log('[NEXUS-PRO] Suno API Key belum diisi. Menjalankan mode demo/simulasi.');
            
            // Simulasi delay pengerjaan AI selama 1.5 detik
            await new Promise(resolve => setTimeout(resolve, 1500));

            return res.json({
                success: true,
                mode: 'demo_simulation',
                audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Contoh audio interaktif
                title: 'NEXUS Generated Track (Demo Mode)',
                prompt: prompt
            });
        }

        // Jika API Key asli sudah ada, sistem akan menembak ke server produksi Suno AI
        const response = await axios.post('https://api.suno.ai/v1/generate', {
            prompt: prompt,
            make_instrumental: instrumental || false,
            duration: duration || 60
        }, {
            headers: { 'Authorization': `Bearer ${sunoKey}` }
        });

        res.json({ success: true, data: response.data });

    } catch (error) {
        console.error('Error pada Music API:', error);
        res.status(500).json({ error: 'Gagal memproses pembuatan musik AI.' });
    }
});

module.exports = router;
