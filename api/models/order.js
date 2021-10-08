const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    category: String
});

module.exports = mongoose.model('Order', orderSchema);