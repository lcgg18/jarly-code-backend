const { modeloProyecto } = require("../../models/proyectos");

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await modeloProyecto.find().populate("lider").populate('avances').populate('inscripciones');
      return proyectos;
    },

    Proyecto: async (parent, args) => {
      const proyecto = await modeloProyecto
        .findOne({ _id: args._id })
        .populate("lider").populate('avances').populate('inscripciones');
      return proyecto;
    },
  },

  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await modeloProyecto.create({
        nombre: args.nombre,
        objetivos: args.objetivos,
        presupuesto: args.presupuesto,
        lider: args.lider,
        estado: args.estado,
        fase: args.fase,
      });

      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => {
      const proyectoEditado = await modeloProyecto.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          objetivos: args.objetivos,
          presupuesto: args.presupuesto,
          lider: args.lider,
          estado: args.estado,
          fase: args.fase,
        },
        { new: true }
      );

      return proyectoEditado;
    },

    actualizarEstadoProyecto: async (parent, args) => {
      if (args.estado === "ACTIVO") {
        const estadoActualizado = await modeloProyecto.findByIdAndUpdate(
          args._id,
          {
            fechaInicio: Date.now(),
            estado: args.estado,
            fase: "INICIADO",
          },
          { new: true }
        );
        return estadoActualizado;

      }
    },

    finalizarProyecto: async (parent, args) => {
      if (args.fase === "TERMINADO") {
        const proyectoFinalizado = await modeloProyecto.findByIdAndUpdate(
          args._id,
          {
            fechaFin: Date.now(),
            estado: "INACTIVO",
            fase: args.fase,
          },
          { new: true }
        );
        return proyectoFinalizado;

      }
    },



    eliminarProyecto: async (parent, args) => {
      const proyectoEliminado = await modeloProyecto.findOneAndDelete({
        _id: args._id,
      });
      return proyectoEliminado;
    },
  },
};

module.exports = { resolversProyecto };
