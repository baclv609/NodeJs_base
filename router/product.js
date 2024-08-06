const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');


router.get('/', ProductController.apiGetList);
router.get('/:id', ProductController.apiDetail);
router.post('/', ProductController.apiCreate);
router.put('/:id', ProductController.apiUpdate);
router.delete('/:id', ProductController.apiDelete);

module.exports = router;