const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const Planta = require("../models/planta");
const Adubo = require("../models/adubo");
const user = require("../models/user");

exports.adubos_get_by_id = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    const id = req.params.AduboId;
    Adubo.find({_id: id, usuarioEmail: user.email})
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

exports.adubos_get_all = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    Adubo.find({usuarioEmail: user.email})
    .exec()
    .then(docs => {
        if (docs.length > 0){
            res.status(200).json(docs);
        }else {
            res.status(200).json({
                message: 'Nenhum registro encontrado'
            });
        }
    console.log(docs.length)   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

exports.adubos_cadastro = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    const adubo = new Adubo({
        _id: new mongoose.Types.ObjectId(),
        usuarioId: user.userId,
        usuarioEmail: user.email,
        produto: req.body.produto,
        plantaId: req.body.plantaId,
        nomeMarca: req.body.nomeMarca,
        tipo: req.body.tipo,
        modoAplicacao: req.body.modoAplicacao,
        estrutura: req.body.estrutura
    });
    adubo
    .save()    
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Adubo criado com sucesso",
            adubo
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.adubos_patch_by_id = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    const id = req.params.AduboId;

    const updateOps = {};
    for (const ops in req.body) {
        updateOps[ops] = req.body[ops]
    }

    Adubo.updateOne({_id: id, usuarioEmail: user.email},{$set: updateOps})
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

exports.adubos_delete_by_id =  (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    const id = req.params.AduboId;
    Adubo.remove({_id: id, usuarioEmail: user.email})
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