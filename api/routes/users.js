// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importando o modelo de user
const User = require('../models/user');

const UsersController = require('../controllers/users');

router.post('/cadastro', UsersController.users_cadastro);

router.post('/login', UsersController.users_login);

router.delete('/:userId', UsersController.users_delete_by_id);

module.exports = router;