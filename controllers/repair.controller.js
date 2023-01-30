
const Repair = require('../models/repair.model');

// OBTENER LA LISTA DE MOTOS PENDIENTES (PENDING) DE REPARAR
exports.findAllRepairs = async (req, res) => {
    try {
        // BUSCAMOS TODOS LOS USUARIOS CON STATUS PENDING
        const repairs = await Repair.findAll({
            where: {
                status: "pending",
            }
        });
        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'ROUTE - GET',
            //Enviamos todos los repairs
            repairs

        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// OBTENER UNA MOTO PENDIENTE DE REPARAR POR SU ID 
exports.findRepair = async (req, res) => {
    try {
        // OBTENEMOS ID DE LA REQ PARAMS
        const { id } = req.params;

        // BUSCAR EL REPAIR PENDING DE FORMA INDIVIDUAL
        const repair = await Repair.findOne({
            where: {
                // id:id,
                id,
                status: "pending"
            }
        });

        // SI NO EXISTE ENVIAMOS UN ERROR
        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: 'The repair was not found',
            });
        }

        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'The repair was found successfully.',
            //Enviamos el repair a consultar
            repair
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// CREAR UNA CITA, SE DEBE INCLUIR EN EL REQ.BODY LO SIGUIENTE (DATE, USERID) EL USERID SIENDO EL ID DEL USUARIO QUIEN SOLICITA LA REPARACIÓN. 
exports.createRepair = async (req, res) => {
    try {
        // OBTENER INFORMACION  DEL REQ BODY
        const { date, userId } = req.body;

        // CREAR UN NUEVA REPARACIÓN
        const newRepair = await Repair.create({
            date,
            userId,
        });

        // RESPUESTA DEL SERVID
        res.status(201).json({
            status: 'success',
            message: 'The repair was created. ',

            newRepair,

        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// ACTUALIZAR EL STATUS DE UNA REPARACIÓN HA COMPLETADO (CAMBIAR STATUS A COMPLETED) 
exports.updateRepair = async (req, res) => {
    try {
        // OBTENEMOS ID DE LA REQ PARAMS
        const { id } = req.params;

        // BUSCAR EL USUARIO A ACTUALIZAR
        const repair = await Repair.findOne({
            where: {
                // id:id,
                id,
                status: "pending"
            },
        });

        // SI NO EXISTE ENVIAMOS UN ERROR
        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: 'The repair was not found',
            });
        }

        // ACTUALIZAMOS EL ESTADO DEL REPAIR
        await repair.update({
            status: "completed"
        });

        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'The repair has been completed',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// CANCELAR LA REPARACIÓN DE UN USUARIO (CAMBIAR STATUS A CANCELLED) 
exports.deleteRepair = async (req, res) => {
    try {
        // OBTENEMOS ID DE LA REQ PARAMS
        const { id } = req.params;

        // BUSCAR EL REPAIR A ACTUALIZAR
        const repair = await Repair.findOne({
            where: {
                // id:id,
                id,
                status: "pending"
            },
        });

        // SI NO EXISTE ENVIAMOS UN ERROR
        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: 'The repair was not found',
            });
        }

        // ACTUALIZAMOS EL ESTADO DEL REPAIR
        await repair.update({
            status: "cancelled"
        });

        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'The repair has been disabled',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

