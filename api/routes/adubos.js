// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importando o modelo de produto
const Adubo = require('../models/adubo');

router.get('/', (req, res, next) => {
    Adubo.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if (docs.length >= 0){
            res.status(200).json(docs);
        }else {
            res.status(200).json({
                message: 'Nenhum registro encontrado'
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    const adubo = new Adubo({
        _id: new mongoose.Types.ObjectId(),
        id: Number,
        nomeMarca: String,
        tipo: String,
        modoAplicacao: String,
        estrutura: String
    })
    adubo
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Adubo criado com sucesso",
            Adubo 
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.get('/:AduboId', (req, res, next) => {
    const id = req.params.AduboId;
    Adubo.findById(id)
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

router.patch('/:AduboId', (req, res, next) => {
    const id = req.params.AduboId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Adubo.updateOne({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

router.delete('/:AduboId', (req, res, next) => {
    const id = req.params.AduboId;
    Adubo.remove({_id: id})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;