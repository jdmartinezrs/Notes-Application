const user = require("../../adapters/usuarioSchema");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class User{

    async postNewUserModel(userData) {
        const newUser = new user(userData); // Creas un nuevo usuario con los datos que recibes
        return await newUser.save(); // Guardas el usuario en la base de datos
    }

    async logginUserModel(nombre_usuario) { 
        return await user.findOne({ nombre_usuario });
    }

    async updateLoginTimestamp(userId) {
        return await user.findByIdAndUpdate(
            userId,
            { 
                fecha_y_hora_de_inicio_de_sesion: new Date(),
                $currentDate: { updatedAt: true }
            },
            { 
                new: true
            }
        );
    }
        
}

module.exports = User;