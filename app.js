const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

const dirPath = path.join(__dirname, '/public');
const static = app.use(express.static(dirPath));

const characters = require('./routes/characters');
const character = require('./routes/characters');
const students = require('./routes/students');
const teachers = require('./routes/teachers');

app.get('/', (req, res) => {
    res.sendFile(static + '/index.html');
});

app.use('/api/characters', characters);

app.use('/api/character', character);

app.use('/api/students', students);

app.use('/api/teachers', teachers);

app.listen(PORT, () => console.log(`Server is up on http://localhost:${PORT}`));
