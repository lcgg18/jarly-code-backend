const { modeloAvance } = require("../../models/avances");

const resolversAvance = {
  Query: {
    Avances: async (parent, args, context) => {
      if (context.userData) {
        const avances = await modeloAvance
          .find()
          .populate("proyecto")
          .populate("creadoPor");
        return avances;
      } else {
        return null;
      }
    },
    filtrarAvance: async (parents, args, context) => {
      if (context.userData) {
        const avanceFiltrado = await modeloAvance
          .find({ ...args.filtro })
          .populate("creadoPor")
          .populate("proyecto");
        return avanceFiltrado;
      } else {
        return null;
      }
    },
  },
  Mutation: {
    crearAvance: async (parents, args, context) => {
      if (context.userData) {
        const avanceCreado = await modeloAvance.create({
          fecha: Date.now(),
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        });

        const avances = await modeloAvance.find({
          proyecto: avanceCreado.proyecto,
        });

        if (avances.length === 1) {
          const proyectoModificado = await modeloProyecto.findOneAndUpdate(
            { _id: avanceCreado.proyecto },
            {
              fase: "DESARROLLO",
            }
          );
          console.log(proyectoModificado);
        }

        return avanceCreado;
      } else {
        return null;
      }
    },

    editarAvance: async (parent, args, context) => {
      if (context.userData) {
        const editarAvance = modeloAvance.findByIdAndUpdate(
          args.id,
          {
            descripcion: args.descripcion,
          },
          { new: true }
        );
        return editarAvance;
      } else {
        return null;
      }
    },

    crearObservacion: async (parent, args, context)=> {

      const observacionesCreada = await modeloAvance.findByIdAndUpdate(
        args._id,
        {
          $addToSet: {
            observaciones: args.observacion,
          },
        },
        { new: true}
        );
        return observacionesCreada
    }
  },
};

module.exports = { resolversAvance };
