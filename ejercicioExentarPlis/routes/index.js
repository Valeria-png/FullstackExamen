
const router = require('express').Router();
// const { where } = require('sequelize');
const Product = require('../models/product')


router.get('/products', async(req, res) => {
    try{
        const products = await Product.findAll();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/products/:productID', async(req, res) => {
    try{
        const product = await Product.findByPk(req.params.productID);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post('/products', async(req, res) => {
    try{
        await Product.sync();
        const {productName, price, imageSRC, category} = req.body;
        const newProduct = await Product.create({productName, price, imageSRC, category});
        res.status(201).json(newProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.put('/products/:productID', async(req, res) => {
    try{
        const {productName, price, imageSRC, category} = req.body;
        const product = await Product.findByPk(req.params.productID);
        await product.update({productName, price, imageSRC, category});
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.delete('/products/:productID', async(req, res) => {
    try{
        const product = await Product.findByPk(req.params.productID);
        await product.destroy();
        res.status(200).json({message: 'Product deleted'});
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get('/products/:categoryName', async(req, res) => {
    try{
        const productCategory = await Product.findAll({
            where: {
                category: req.params.categoryName
            }
        });
        res.status(200).json(productCategory);
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;