const mongoose = require('mongoose');

const aduboSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    nomeMarca: String,
    tipo: String,
    modoAplicacao: String,
    estrutura: String
});

module.exports = mongoose.model('adubo', aduboSchema);