const UserRepository = require('../../domain/repositories/usuarioRepository')

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    
    async postNewUserService(data) {
        return await this.userRepository.postNewUserRepository(data)
    }

    async getUserByNameAndPasswordService(body){
        const [user] = await this.userRepository.getUserByNombre_user(body);
        if(!user) throw new Error(JSON.stringify({status: 404, message: 'User not found'}))
         const token = await this.userRepository.getUserByContrasena_hash(body.contrasena_hash,user);
        if(!token) throw new Error(JSON.stringify({status: 404, message: 'Incorrect Contrasena_hash'}))
            user.fecha_y_hora_de_inicio_de_sesion = new Date();  
            return token;
    }


}

module.exports = UserService;