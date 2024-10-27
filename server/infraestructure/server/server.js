const express = require('express');
const session = require('express-session');
const { limiTotal } = require('../middlewares/rateLimit');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
// const path = require('path');
// const cookieParser = require('cookie-parser')
const userRoutes = require('../../application/routes/usuarioRoutes');
const noteRoutes = require('../../application/routes/noteRoutes')
const createServer = () => {
    const app = express();

    app.use(express.json());
    // app.use(cookieParser());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);


    // app.use(session({
    //     secret: 'tu_secreto_aqui', 
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: { 
    //         secure: false, 
    //         httpOnly: true, 
    //     }
    // }));
 app.use('/user', userRoutes);
app.use('/note', noteRoutes)
    return app; 
};

module.exports = createServer;