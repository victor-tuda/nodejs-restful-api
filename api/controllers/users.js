const mongoose = require("mongoose")

const User = require('../models/user');

exports.users_cadastro = (req, res, next) =>{
    console.log('teste')
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "E-mail cadastrado já existente"
            })
        }  
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Usuário criado com sucesso!"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
                }   
            })
        }
    })
};

exports.users_login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1){
            res.status(401).json({
                message: 'Autenticação falhou'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err){
                res.status(401).json({
                    message: 'Autenticação falhou'
                })
            }
            if (result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: 'Autenticação autorizada',
                    token: token
                })
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })

};

exports.users_delete_by_id = (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Usuário excluído com sucesso!'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
};