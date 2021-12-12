const { Schema, model } = require("mongoose");



const userSchema = new Schema(
  {
    correo: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "El formato del correo electrónico está malo.",
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

  userSchema.virtual('avances', {
    ref: 'Avance',
    localField: '_id',
    foreignField: 'Usuario',
  });
  
  userSchema.virtual('inscripciones', {
    ref: 'Inscripcion',
    localField: '_id',
    foreignField: 'Usuario',
  });



const modeloUsuario = model("Usuario", userSchema, "usuarios");

module.exports = { modeloUsuario };
