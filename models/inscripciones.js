const { Schema, model } = require("mongoose");
const { modeloProyecto } = require("./proyectos");
const { modeloUsuario } = require("./usuarios");

const inscripcionSchema = new Schema({
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
  estado: {
    type: String,
    enum: ["ACEPTADA", "RECHAZADA", "PENDIENTE"],
    default: "PENDIENTE",
  },
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
});

const modeloInscripcion = model(
  "Inscripcion",
  inscripcionSchema,
  "inscripciones"
);

module.exports = { modeloInscripcion };
