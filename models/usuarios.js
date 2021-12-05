const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: "El formato del correo electrónico no es correcto.",
    },
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ESTUDIANTE", "LIDER", "ADMINISTRADOR"],
  },
  estado: {
    type: String,
    enum: ["PENDIENTE", "AUTORIZADO", "NO_AUTORIZADO"],
    default: "PENDIENTE",
  },
},

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

usuarioSchema.virtual('avances', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'Usuario',
});

usuarioSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'Usuario',
});

const modeloUsuario = model("Usuario", usuarioSchema, "usuarios");

module.exports = { modeloUsuario };
