// RUTAS : puntos de entrada de la aplicacion

const { Router } = require("express");
const { findAllRepairs, findRepair, createRepair, deleteRepair, updateRepair } = require("../controllers/repair.controller");
const router = Router();


router.get('/', findAllRepairs);

router.get('/:id', findRepair);

router.post('/', createRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);


module.exports = {
    repairRouter: router,
}