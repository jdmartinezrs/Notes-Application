const User = require('../models/usuariosModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserRepository {

    async postNewUserRepository(userData) {
        try {
            return await new User().postNewUserModel(userData); // Asegúrate de usar el método de UserModel correctamente
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving user'})); // Captura y lanza errores de la base de datos
        }
    }

    async getUserByNombre_user(body) {
        try {
            const user = new User();
            let { nombre_usuario } = body;
            return await user.logginUserModel(nombre_usuario);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error logging the user'}))
        }
    }

    async getUserByContrasena_hash(contrasena_hash, user) {
        try {
            const isMatch = await bcrypt.compare(contrasena_hash, user.contrasena_hash);
            if (!isMatch) throw new Error(JSON.stringify({status: 401, message: 'No Authorized'}));
            
            // Actualizar timestamp y obtener el usuario actualizado
            const userModel = new User();
            const updatedUser = await userModel.updateLoginTimestamp(user._id);
            
            if (!updatedUser) {
                throw new Error(JSON.stringify({status: 404, message: 'Error updating login timestamp'}));
            }

            // Crear el token con el usuario actualizado
            const token = jwt.sign({
                user: updatedUser.toObject()
            }, process.env.JWT_SECRET, {expiresIn: '15m'});
            
            return {
                token,
                timestamps: {
                    fecha_y_hora_de_inicio_de_sesion: updatedUser.fecha_y_hora_de_inicio_de_sesion,
                    updatedAt: updatedUser.updatedAt
                }
            };
        } catch (error) {
            throw error;
        }
    }

   


}

module.exports = UserRepository;