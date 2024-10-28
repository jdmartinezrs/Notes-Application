const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Mover la importación de cors aquí
const { limiTotal } = require('../middlewares/rateLimit');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const userRoutes = require('../../application/routes/usuarioRoutes');
const noteRoutes = require('../../application/routes/noteRoutes');
const noteHistoryRoutes = require('../../application/routes/noteHistoryRoutes');

const createServer = () => {
    const app = express();

    // Middleware para permitir CORS
    app.use(cors({
        origin: 'http://localhost:5173', // Cambia esto si es necesario
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true // Si necesitas enviar cookies o credenciales
    }));

    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

    // Configuración de sesiones (descomentar si es necesario)
    /*
    app.use(session({
        secret: 'tu_secreto_aqui', 
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false, // Cambia a true si usas HTTPS
            httpOnly: true,
        }
    }));
    */

    // Rutas
    app.use('/user', userRoutes);
    app.use('/note', noteRoutes);
    app.use('/history', noteHistoryRoutes);

    return app; 
};

module.exports = createServer;
