//khởi tạo server
const express = require('express');

const mongoose = require('mongoose');
const productRouter = require('./router/product');
const publicRouter = require('./router/public');
const ProductController = require('./controllers/ProductController');
const AuthController = require('./controllers/AuthController');
const multer = require('multer');
const { authenticateToken, checkRole } = require('./middlewares');

const app = express();
const port = 9000;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage })

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/demowd18412')
    .then(result => {
        app.get('/', ProductController.UserGetList);
        app.get('/detail', ProductController.detail);
        app.get('/admin', ProductController.getList);
        app.get('/admin/create', ProductController.create);
        app.post('/admin/save', upload.single('image'), ProductController.save);
        app.get('/admin/edit', ProductController.edit);
        app.post('/admin/update', upload.single('image'), ProductController.update);
        app.get('/admin/delete', ProductController.delete);

        app.use('/api/product', authenticateToken, checkRole('admin'), productRouter);

        app.use('/api/login', AuthController.login)
        app.use('/api/resgiter', AuthController.resgiter)

        app.listen(port, () => {
            console.log(`running in port ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })