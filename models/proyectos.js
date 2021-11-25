const {Schema, model} = require('mongoose');

const proyectoSchema = new Schema({

  nombre: {
    type: String,
    required: true,
    unique: true,    
  },

  objetivoGeneral: {
    type: String,
    required: true,    
  },

  objetivosEspecificos: {
    type: String,
    required: true,
  },

  presupuesto: {
    type: Float32Array,
    required: true,
  },

  lider:{
    type: String,
    required: true,  
  },

  fechaInicio:{
    type: Date,
    required: true,  
  },

  fechaFin:{
    type: Date,
    required: true,  
  },


  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    default: "ACTIVO"
  },

  fase: {
    type: String,
    required: true,
    enum: ["INICIADO", "EN DESARROLLO", "TERMINADO"],
    default: "INICIADO"
  },

  
});

const modeloProyectos = model('Proyecto', proyectoSchema,'proyectos');

module.exports = { modeloProyectos };