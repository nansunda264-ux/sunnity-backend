const multer = require('multer');

// Gunakan memoryStorage agar file ditahan di dalam RAM (Memory) sementara,
// bukan disimpan ke hard disk/folder, karena sistem Vercel bersifat Read-Only.
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Batas maksimal file 10MB
});

module.exports = upload;
