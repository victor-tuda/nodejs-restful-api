// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importando o modelo de user
const User = require('../models/user');

router.post('/cadastro', (req, res, next) =>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
});

module.exports = router;