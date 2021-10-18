const mongoose = require('mongoose');

const aduboSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    plantaId: { type: mongoose.Schema.Types.ObjectId, ref: "planta", required: true }, 
    nomeMarca: { type: String, required: true },
    tipo: String,
    modoAplicacao: String,
    estrutura: String
});

module.exports = mongoose.model('adubo', aduboSchema);