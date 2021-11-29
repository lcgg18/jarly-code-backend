const { modeloAvance } = require("../../models/avances");
const bcrypt = require ('bcrypt') ;

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await modeloAvance.find();
      return avances;
    },
    Avance: async (parent, args) => {
      const avance = await modeloAvance.findOne({ _id: args._id });
      return avance;
    },
    Lideres: async (parent, args) => {
      const lideres = await modeloAvance.find({ creadoPor: args.creadoPor });
      return lideres;
    },
  },
  Mutation: {
    crearAvance: async (parent, args) => {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const AvanceCreado = await modeloAvance.create({
        fecha: args.fecha ,  
        descripcion: args.descripcion,
        observaciones: args.observaciones,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
        password: hashedPassword
      });     

      return AvanceCreado;
    },

    editarAvance: async (parent, args) => {
      const avanceEditado = await modeloAvance.findByIdAndUpdate(
        args._id,
        {
            fecha: args.fecha ,  
            descripcion: args.descripcion,
            observaciones: args.observaciones,
            proyecto: args.proyecto,
            creadoPor: args.creadoPor
        },
        { new: true }
      );

      return avanceEditado;
    },
    eliminarAvance: async (parent, args) => {
      const avanceEliminado = await modeloAvance.findOneAndDelete({
        _id: args._id,
      });
      return avanceEliminado;
    },
  },
};

module.exports = { resolversAvance };