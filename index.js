const express = require('express');
const connectDB = require('./db/db');
const cors = require('cors');
const dotenv =require('dotenv');



dotenv.config();


const app = express();


connectDB();


app.use( express.json() );
app.use(cors());






app.listen((process.env.PORT || 4000), () => {
    console.log(`Servidor corriendo en el puerto 4000`)
})