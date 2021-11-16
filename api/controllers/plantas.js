const mongoose = require("mongoose")

const checkAuth = require("../middleware/check-auth");

const Planta = require("../models/planta");
const Adubo = require("../models/adubo");

exports.plantas_cadastro = (req, res, next) => {
    const planta = new Planta({
        _id: new mongoose.Types.ObjectId(),
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
