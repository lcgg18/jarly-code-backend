const {Schema, model} = require('mongoose');
const { modeloProyecto } = require("./proyecto");
const { modeloUsuario }= require('./usuarios');



const avanceSchema = new Schema({
    fecha: {
      type: Date,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    observaciones: [
      {
        type: String,
      },
    ],
    proyecto: {
      type: Schema.Types.ObjectId,
      ref: modeloProyecto,
      required: true,
    },
    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: modeloUsuario,
      required: true,
    },
  });
  
  const modeloAvance = model('Avance', avanceSchema, 'avances');
  
  module.exports = { modeloAvance };