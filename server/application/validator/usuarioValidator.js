const { body, query, param } = require("express-validator");
//const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs')
class UserValidator {

    postNewUserValidator = () => {
        return [
            body('nombre_usuario').notEmpty().isString().withMessage('The name is mandatory'),
            body('email').notEmpty().isEmail().withMessage('Send the email'),
            body('contrasena_hash').notEmpty().isString().isLength({min:5}).custom(async(value,{req}) =>{
                if(value.length < 5) throw new Error('mayor de 5');
                req.body.contrasenahash = await bcrypt.hash(value,10);
                return true;  
         }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            })
        ]
    }

    logginValidator = () => {
        return [
            body('nombre_usuario').notEmpty().isString().withMessage('The name is mandatory'),
            body('contrasena_hash').notEmpty().isString().withMessage('Mayor a 5').isLength({min:5}),
          
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            })
        ]
    }

    validateUserDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

}
module.exports = UserValidator;

