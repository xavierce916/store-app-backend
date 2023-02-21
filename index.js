const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use( cors() );

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth/buyer', require('./routes/buyerAuth') );
app.use('/api/auth/seller', require('./routes/sellerAuth') );
app.use('/api/cars', require('./routes/cars'));



// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});