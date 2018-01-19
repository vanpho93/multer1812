const express = require('express');
const reload = require('reload');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, Date.now() + '.png')
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
        // return cb(null, false);
        return cb(new Error('File type error.'))
    }
    cb(null, true);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 } });

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
