// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// Importando o modelo de produto
const Product = require('../models/product');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Recebendo GET requests em /products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
    .save()
    .then(result => {console.log(result)})
    .catch(err => console.log(err));

    res.status(201).json({
        message: 'Recebendo POST requests em /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Produto atualizado!"
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Produto deletado!"
    })
});

module.exports = router;