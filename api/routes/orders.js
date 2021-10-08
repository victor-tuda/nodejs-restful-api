const express = require('express');
const router = express.Router();

// Importando o modelo
const Order = require('../models/order');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Localizador de Pedidos"
    });
})

router.post('/', (req, res, next) => {
    const order = {
        id: req.body.id,
        category: req.body.category
    }
    res.status(201).json({
        message: "Pedido Solicitado",
        orderId: order.id,
        orderCategory: order.category
    });
})

router.get('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message: 'Detalhes do pedido',
        id: req.params.orderId
    });

});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        id: req.params.orderId,
        message: "Deletado com sucesso"
    })
})

module.exports = router;