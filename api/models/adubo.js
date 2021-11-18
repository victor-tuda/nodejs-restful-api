const mongoose = require('mongoose');

const aduboSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    usuarioId: String,
    usuarioEmail: String,
    produto: String,
    tipo: String,
    modoAplicacao: String,
    estrutura: String
});

module.exports = mongoose.model('adubo', aduboSchema);