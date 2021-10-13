const mongoose = require('mongoose');

const plantaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    apelido: String,
    especie: String,
    imagem: String,
    tipoSolo: String,
    regaFrequencia: String,
    adubagemFrequencia: String,
    incidenciaSolar: String
});

module.exports = mongoose.model('planta', plantaSchema);