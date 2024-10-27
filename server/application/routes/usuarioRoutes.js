const express = require('express');

const UserController = require('../controllers/usuarioController');
const UserValidator = require("../validator/usuarioValidator");

const router = express.Router()
const userController = new UserController();
const userValidator = new UserValidator();


router.post("/usuarios", userValidator.postNewUserValidator(),(req, res) =>userController.postNewUserController(req, res));
router.post("/usuarios/login", userValidator.logginValidator(),(req, res) =>userController.logginController(req, res));




module.exports = router;

