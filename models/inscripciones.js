const {Schema, model} = require('mongoose');
const { modeloProyecto } = require("./proyecto");
const { modeloUsuario }= require('./usuarios');




const inscripcionSchema = new Schema({
    estado: {
      type: String,
      enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
      default: 'PENDIENTE',
    },
    fechaIngreso: {
      type: Date,
      required: false,
    },
    fechaEgreso: {
      type: Date,
      required: false,
    },
    proyecto: {
      type: Schema.Types.ObjectId,
      ref: modeloProyecto,
      required: true,
    },
    estudiante: {
      type: Schema.Types.ObjectId,
      ref: modeloUsuario,
      required: true,
    },
  });
  
  const modeloInscripcion = model('Inscripcion', inscripcionSchema, 'inscripciones');
  
  module.exports = { modeloInscripcion };