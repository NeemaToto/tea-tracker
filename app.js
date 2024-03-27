const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const teaData = JSON.parse(fs.readFileSync('tea.json'));
    res.render('index', { teaData });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
