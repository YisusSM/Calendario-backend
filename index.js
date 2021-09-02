const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//Crear server de express

const app = express();
//db
dbConnection();

//CORS
app.use(cors());


//Lectura y parseo del body
app.use(express.json());

//rutas

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'./public/index.html'));
});

//CRUD:Eventos



//Directorio Público
app.use(express.static('public'));

//escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`Server Corriendo en el puerto ${process.env.PORT}`);
});