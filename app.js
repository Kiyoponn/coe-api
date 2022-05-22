const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

const dirPath = path.join(__dirname, '/public');

const static = app.use(express.static(dirPath));

app.get('/', (req, res) => {
    res.sendFile(static + '/index.html');
});

app.use('/api/characters', require('./routes/characters'));

app.use('/api/character', require('./routes/characters'));

app.use('/api/students', require('./routes/students'));

app.use('/api/teachers', require('./routes/teachers'));

app.listen(PORT, () => console.log(`Server is up on http://localhost:${PORT}`));
