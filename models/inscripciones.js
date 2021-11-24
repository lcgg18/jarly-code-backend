const {Schema, model} = require('mongoose');


const inscripcionSchema = new Schema({
  proyecto: {
    type: String,
    required: true,
    unique: true,
  },
  estudiante: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ["ACEPTADA", "RECHAZADA", "PENDIENTE"],
    default: "PENDIENTE"
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  fechaEgreso: {
    type: Date,
    required: true,
  }
});

const modeloInscripcion = model('Inscripcion', inscripcionSchema,'inscripciones');

module.exports = { modeloInscripcion };