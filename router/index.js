// const ProductController = require('../controllers/ProductController');

// const AuthController = require('../controllers/AuthController');
// exports.routeRoot = (app) => {
//     app.get('/', ProductController.getList);
//     app.get('/create', ProductController.create);
//     app.post('/save', upload.single('image'), ProductController.save);
//     app.get('/edit/:id', ProductController.edit);
//     app.post('/update/:id', upload.single('image'), ProductController.update);
//     app.get('/delete/:id', ProductController.delete);

//     //router cho api
//     app.get('/products', ProductController.apiGetList);
//     app.get('/products/:id', ProductController.apiDetail);
//     app.post('/products', upload.single('image'), ProductController.apiCreate);
//     app.put('/products/:id', upload.single('image'), ProductController.apiUpdate);

//     app.post('/api/resgiter', AuthController.resgiter);
//     app.post('/api/login', AuthController.login);
// }