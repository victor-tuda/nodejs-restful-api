// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importando o modelo de produto
const Adubo = require('../models/adubo');
const Planta = require('../models/planta');

router.get('/', (req, res, next) => {
    Adubo.find()
    .select('_id nomeMarca tipo modoAplicacao estrutura')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return{
                    _id: doc._id,
                    plantaId: doc.plantaId,
                    nomeMarca: doc.nomeMarca,
                    tipo: doc.tipo,
                    modoAplicacao: doc.modoAplicacao,
                    estrutura: doc.estrutura,
                    request: {
                        type: "GET",
                        url: process.env.URL + "/orders/" + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    Planta.findById(req.body.plantaId)
    .then(planta => {
        const adubo = new Adubo({
            _id: new mongoose.Types.ObjectId(),
            plantaId: req.body.plantaId,
            nomeMarca: req.body.nomeMarca,
            tipo: req.body.tipo,
            modoAplicacao: req.body.modoAplicacao,
            estrutura: req.body.estrutura
        });
        return adubo.save()
    })    
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