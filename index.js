const express = require('express');
const reload = require('reload');
const upload = require('./uploadConfig');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
reload(app);

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send('Thanh cong');
});

app.listen(3000, () => console.log('Server started!'));
