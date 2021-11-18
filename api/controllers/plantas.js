const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Planta = require("../models/planta");
const Adubo = require("../models/adubo");


exports.plantas_get_by_id = (req, res, next) => {
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
};

exports.plantas_get_all = (req, res, next) => {
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
};

exports.plantas_cadastro = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    console.log(user);

    const planta = new Planta({
        _id: new mongoose.Types.ObjectId(),
        usuarioId: user.userId,
        usuarioEmail: user.email,
        apelido: req.body.apelido,
        especie: req.body.especie,
        imagem: req.body.imagem,
        tipoSolo: req.body.tipoSolo,
        regaFrequencia: req.body.regaFrequencia,
        adubagemFrequencia: req.body.adubagemFrequencia,
        incidenciaSolar: req.body.incidenciaSolar
    });
    planta
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Planta criada com sucesso",
            Planta 
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
};

exports.plantas_patch_by_id = (req, res, next) => {
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
};

exports.plantas_delete_by_id = (req, res, next) => {
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
};