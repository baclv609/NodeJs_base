const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getList);
router.get('/create', ProductController.create);
// router.post('/save', upload.single('image'), ProductController.save);
router.get('/edit/:id', ProductController.edit);
// router.post('/update/:id', upload.single('image'), ProductController.update);
router.get('/delete/:id', ProductController.delete);

exports.dèault = router;