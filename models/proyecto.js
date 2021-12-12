const {Schema, model} = require('mongoose');
const { modeloUsuario }= require('./usuarios');



const projectSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  presupuesto: {
    type: Number,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: false,
    default: null,
  },
  fechaFin: {
    type: Date,
    required: false,
    default: null,
  },
  estado: {
    type: String,
    enum: ["ACTIVO","INACTIVO"],
    default: "INACTIVO",
  },
  fase: {
    type: String,
    enum: ["INICIADO","DESARROLLO","TERMINADO","NULO"],
    default: "NULO",
  },
  lider: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: modeloUsuario,
  },
  objetivos: [
    {
      descripcion: {
        type: String,
        required: true,
      },
      tipo: {
        type: String,
        enum: ["GENERAL", "ESPECIFICO"],
        required: true,
      },
    },
  ],
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
);

projectSchema.virtual('avances', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'proyecto',
});

projectSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'proyecto',
});

const modeloProyecto = model('Proyecto', projectSchema, 'proyectos');

module.exports= { modeloProyecto };