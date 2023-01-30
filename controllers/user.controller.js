
const User = require('../models/user.model');

// OBTENER LA LISTA DE LOS USUARIOS EN LA BASE DE DATOS
exports.findAllUsers = async (req, res) => {
    try {
        // BUSCAMOS TODOS LOS USUARIOS CON STATUS AVAILABLE
        const users = await User.findAll({
            where: {
                status: "available",
            }
        });

        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'The users has been show',
            //Enviamos todos los usuarios
            users

        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// OBTENER UN SOLO USUARIO DADO UN ID
exports.findUser = async (req, res) => {
    try {
        // OBTENEMOS ID DE LA REQ PARAMS
        const { id } = req.params;

        // BUSCAR EL USUARIO DE FORMA INDIVIDUAL
        const user = await User.findOne({
            where: {
                // id:id,
                id,
                status: "available"
            }
        });

        // SI NO EXISTE ENVIAMOS UN ERROR
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'The user was not found',
            });
        }

        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'The product was found successfully.',
            //ENVIAMOS EL USUARIO A CONSULTAR
            user
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// CREAR UN NUEVO USUARIO, SE DEBE PROPORCIONAR POR EL REQ.BODY (NAME, EMAIL, PASSWORD, ROLE), EL ROLE (ROL) PUEDE SER CLIENT O EMPLOYEE
exports.createUser = async (req, res) => {
    try {
        // OBTENER INFORMACION  DEL REQ BODY
        const { name, email, password, role } = req.body;

        // CREAR UN NUEVO USUARIO
        const newUser = await User.create({
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            password,
            role,
        });

        // RESPUESTA DEL SERVIDOR
        res.status(201).json({
            status: 'success',
            message: 'The user was created. ',

            newUser,

        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// ACTUALIZAR LOS DATOS DE UN USUARIO DADO UN ID, SOLO PUEDE ACTUALIZAR SU NAME Y EMAIL
exports.updateUser = async (req, res) => {
    try {
        // OBTENEMOS ID DE LA REQ PARAMS
        const { id } = req.params;

        // OBTENER INFORMACION DEL REQ BODY
        const { name, email } = req.body;

        // BUSCAR EL USUARIO A ACTUALIZAR
        const user = await User.findOne({
            where: {
                // id:id,
                id,
                status: "available"
            },
        });

        // SI NO EXISTE ENVIAMOS UN ERROR
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'The user was not found',
            });
        }

        // ACTUALIZAMOS EL USUARIO ENCONTRADO
        const updateUser = await user.update({
            name,
            email,
        });

        // RESPUESTA DEL SERVIDOR
        res.status(200).json({
            status: 'success',
            message: 'The user has been update successfully',

            updateUser,

        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// DESHABILITAR LA CUENTA DE UN USUARIO
exports.deleteUser = async (req, res) => {

    // OBTENEMOS ID DE LA REQ PARAMS
    const { id } = req.params;

    // BUSCAR EL USUARIO A ELIMINAR
    const user = await User.findOne({
        where: {
            // id:id,
            id,
            status: "available"
        },
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'The user was not found',
        });
    }

    // ACTUALIZAMOS EL USUARIO ENCONTRADO
    await user.update({
        status: "not available"
    });

    // RESPUESTA DEL SERVIDOR
    res.json({
        status: 'success',
        message: 'The user has been disabled',
    });
}

