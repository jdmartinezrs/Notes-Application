const { validationResult } = require('express-validator');
const UserService = require('../services/usuarioServices')


class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async postNewUserController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
                return res.status(400).json({ errors: errors.array() });
            
            delete req.body.contrasena_hash;
            let {contrasenahash:contrasena_hash} = req.body;
            req.body.contrasena_hash = contrasena_hash;
    
            const user = await this.userService.postNewUserService(req.body);
            
            // Elimina el campo no deseado antes de la respuesta
            const { fecha_y_hora_de_inicio_de_sesion, ...responseUser } = user.toObject(); // Convierte el documento a un objeto plano
            res.status(201).json(responseUser);
        } catch (error) {
            const errorObj = error.message ? JSON.parse(error.message) : { status: 500, message: "Internal Server Error" };
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async logginController(req, res) {
        try { 
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
                 return res.status(400).json({ errors: errors.array() });
            const loginData = await this.userService.getUserByNameAndPasswordService(req.body)
            res.status(201).json(loginData);
        }  catch (error) {
            const errorObj = error.message ? JSON.parse(error.message) : { status: 500, message: "Internal Server Error" };
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }



}


module.exports = UserController;