// RUTAS : puntos de entrada de la aplicacion

const { Router } = require("express");
const { findAllUsers, findUser, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const router = Router();


router.get('/', findAllUsers);

router.get('/:id', findUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);


module.exports = {
    userRouter: router,
}