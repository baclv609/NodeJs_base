const Product = require('../models/Product');

exports.getList = async (req, res) => {
    try {
        var products = await Product.find();
        res.render('list', { products });
    } catch (error) {
        console.log(error);
    }
}
exports.UserGetList = async (req, res) => {
    try {
        var products = await Product.find();
        res.render('useList', { products });
    } catch (error) {
        console.log(error);
    }
}
exports.detail = async (req, res) => {
    try {
        var product = await Product.findById(req.query.id);
        if (product) {
            res.render('detail', { product });
        } else {
            console.log('Không tìm thấy sản phẩm tương ứng');
        }
    } catch (err) {
        console.log(err);
    }
}

exports.create = (req, res) => {
    res.render('create');
}

exports.save = async (req, res) => {
    try {
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }


        var product = await Product.create(newProduct);
        if (product) {
            console.log('create success');
            res.redirect('/admin');
        }
    } catch (err) {
        console.log(err);
    }
}

exports.edit = async (req, res) => {
    try {
        var product = await Product.findById(req.query.id);
        if (product) {
            res.render('edit', { product });
        } else {
            console.log('Không tìm thấy product tương ứng');
        }
    } catch (err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    try {
        var updateProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }
        console.log("updateProduct", updateProduct);
        console.log("req.params.id", req.body.id);

        var product = await Product.findByIdAndUpdate(
            req.body.id,
            updateProduct
        );
        if (product) {
            console.log('update success');
            res.redirect('/admin');
        }
    } catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.query.id);
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

//API 
exports.apiGetList = async (req, res) => {
    try {
        var products = await Product.find();
        res.status(200).json({ data: products });
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

exports.apiDetail = async (req, res) => {
    try {
        var product = await Product.findById(req.params.id);
        res.status(200).json({ data: product })
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}
exports.apiCreate = async (req, res) => {
    try {
        var newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
        console.log("newProduct", newProduct);

        var product = await Product.create(newProduct);
        if (product) {
            console.log('Create success');
            res.status(200).json({ message: 'Create successfully', data: product })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
}

exports.apiUpdate = async (req, res) => {
    try {
        var updateProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
        await Product.findByIdAndUpdate(req.params.id, updateProduct);
        res.status(200).json({ message: 'Update successfully' });
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}


exports.apiDelete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Delete successfully' })
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

