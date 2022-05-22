const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/api/characters', require('./api/characters'));

app.use('/api/character', require('./api/characters'));

app.use('/api/students', require('./api/students'));

app.use('/api/teachers', require('./api/teachers'));

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
