const { Schema, model } = require("mongoose");
const { modeloUsuario } = require("./usuarios");

const proyectoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
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

  presupuesto: {
    type: Number,
    required: true,
  },

  lider: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: modeloUsuario,
  },

  fechaInicio: {
    type: Date,
    required: false,
  },

  fechaFin: {
    type: Date,
    required: false,
  },

  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    default: "INACTIVO",
  },

  fase: {
    type: String,
    required: true,
    enum: ["INICIADO", "EN DESARROLLO", "TERMINADO"],
    default: "NULO",
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
);

proyectoSchema.virtual('avances', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'proyecto',
});

proyectoSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'proyecto',
});

const modeloProyecto = model("Proyecto", proyectoSchema, "proyectos");

module.exports = { modeloProyecto };
