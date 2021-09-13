const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Recebendo GET requests em /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Recebendo POST requests em /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Você encontrou o ID especial :D',
            id: id
        });
    }
    else{
        res.status(200).json({
            message: 'Você passou um ID'
        })
    }
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