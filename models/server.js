const express = require('express');
// Importamos cors
var cors = require('cors')
const { userRouter } = require('../routes/user.routes');

const { db } = require('../database/db');
const { repairRouter } = require('../routes/repair.routes');



//1. Creamos la clase
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;


        this.paths = {
            users: '/api/v1/user',
            repairs: '/api/v1/repairs',
        }

        // INVOCAR AL METODO DE CONEXION DE BASE DE DATOS
        this.database();

        // INVOCAMOS AL METODO MIDDLEWARES
        this.middlewares();

        // INVOCAMOS AL METODO DE ROUTES
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    // RUTAS : puntos de entrada de la aplicacion
    routes() {
        // Utilizar las rutas de usuarios
        this.app.use(this.paths.users, userRouter);
        // Utilizar las rutas de usuarios
        this.app.use(this.paths.repairs, repairRouter);

    }


    database() {
        db.authenticate()
            .then(() => console.log('Database authenticaded'))
            .catch(error => console.error());

        db.sync()
            .then(() => console.log('Database synced'))
            .catch(error => console.error());
    }

    // METODO LISTEN: esta esuchando solicitudes del puerto 3000
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port", this.port)
        })

    }
}

// Exportamos el Servidor
module.exports = Server;