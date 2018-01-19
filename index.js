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

app.post('/upload', (req, res) => {
    upload.single('avatar')(req, res, err => {
        if (err) return res.send(err.message);
        console.log(req.body);
        console.log(req.file);
        res.send('Thanh cong');
    });
});

app.post('/uploadArray', (req, res) => {
    upload.array('hinhSanPham')(req, res, err => {
        if (err) return res.send(err.message);
        console.log(req.body);
        console.log(req.files.map(f => f.filename));
        res.send('Thanh cong');
    });
});

app.post('/uploadFields', (req, res) => {
    const fieldsConfig = [
        { name: 'hinhChinh', maxCount: 1 },
        { name: 'hinhPhu', maxCount: 3 }
    ];
    upload.fields(fieldsConfig)(req, res, err => {
        if (err) return res.send(err.message);
        console.log(req.body);
        console.log(req.files);
        // console.log(req.files.map(f => ({ name: f.filename, role: f.fieldName })));
        res.send('Thanh cong');
    });
});

app.listen(3000, () => console.log('Server started!'));
