const express = require('express');
const reload = require('reload');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
reload(app);

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', (req, res) => {
    res.send('Thanh cong');
});

app.listen(3000, () => console.log('Server started!'));
