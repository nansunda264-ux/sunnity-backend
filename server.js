const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const chatRouter = require('./chat');
const imageRouter = require('./image');
const musicRouter = require('./music');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyediakan folder uploads dan frontend statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Rute API
app.use('/api/chat', chatRouter);
app.use('/api/image', imageRouter);
app.use('/api/music', musicRouter);

// Endpoint utama mengarah ke index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ganti bagian app.listen kamu dengan kode ini:
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Tambahkan ini di paling bawah jika belum ada:
module.exports = app;
