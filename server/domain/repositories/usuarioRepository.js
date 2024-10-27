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

    async getUserByNombre_user(body){
        try{
            const user = new User();
            let{nombre_usuario}= body;
            let query = [
                {
                    $match: {
                        nombre_usuario
                    }
                },
                {
                    $project: {
                        _id: 0,
                        role: 0,
                        email: 0
                    }
                }
            ];
            
            return await user.logginUserModel(query);
        }catch (error){
            throw new Error(JSON.stringify({status: 400, message: 'Error logging the user'}))
        }
    }
    async getUserByContrasena_hash(contrasena_hash, user){
       let {contrasena_hash:pass} = user
        const isMatch = await bcrypt.compare(contrasena_hash, user.contrasena_hash)
        if(!isMatch) throw new Error(JSON.stringify({status: 401, message: 'No Authorized'}))
        const token = jwt.sign(user, process.env.JWT_SECRET,{expiresIn: '15m'}) 
        return token;
    }
   


}

module.exports = UserRepository;