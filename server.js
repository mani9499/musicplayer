const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to get the list of music files
app.get('/music', (req, res) => {
    const musicDir = path.join(__dirname, 'public','music');
    fs.readdir(musicDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read music files' });
        }
        res.json(files.filter(file => file.endsWith('.mp3')));
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','music.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
