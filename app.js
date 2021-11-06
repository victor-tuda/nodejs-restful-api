// Importando bibliotecas
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// Inicializando morgan
app.use(morgan('dev'));

// Configurações Express
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Alow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow_Methods', 'PUT, POST, GET, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
})

// Importando as rotas
const plantasRoutes = require('./api/routes/plantas');
const adubosRoutes = require('./api/routes/adubos');
const userRoutes = require('./api/routes/user');

// Conexão com Mongoose
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@applantae.81hav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

// Utilizando as rotas
app.use('/plantas', plantasRoutes);
app.use('/adubos', adubosRoutes);
app.use('/usuarios', userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.sttatus || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





module.exports = app;