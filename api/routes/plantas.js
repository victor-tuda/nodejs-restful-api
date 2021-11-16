// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

// Importando o modelo de planta
const Planta = require('../models/planta');

const PlantasController = require('../controllers/plantas');

router.get('/', (req, res, next) => {
    Planta.find()
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

router.post('/', checkAuth, PlantasController.plantas_cadastro);

router.get('/:PlantaId', (req, res, next) => {
    const id = req.params.PlantaId;
    Planta.findById(id)
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

router.patch('/:PlantaId', (req, res, next) => {
    const id = req.params.PlantaId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Planta.updateOne({_id: id},{$set: updateOps})
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

router.delete('/:PlantaId', (req, res, next) => {
    const id = req.params.PlantaId;
    Planta.remove({_id: id})
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