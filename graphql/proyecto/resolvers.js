const { modeloProyecto } = require("../../models/proyecto");

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args, context) => {
      if (context.userData) {
        const proyectos = await modeloProyecto
          .find()
          .populate("lider")
          .populate("avances")
          .populate("inscripciones");
        return proyectos;
      } else {
        return null;
      }
    },
    Proyecto: async (parent, args, context) => {
      if (context.userData) {
        const proyectos = await modeloProyecto
          .findOne({ _id: args._id })
          .populate("lider")
          .populate("avances")
          .populate("inscripciones");
        return proyectos;
      } else {
        return null;
      }
    },
    ProyectosLiderados: async (parent, args, context) => {
      if (context.userData) {
        if (context.userData.rol === "LIDER") {
          const proyectos = await modeloProyecto.find({
            lider: context.userData._id,
          });
          return proyectos;
        }
      } else {
        return null;
      }
    },
  },
  Mutation: {
    crearProyecto: async (parent, args, context) => {
      if (context.userData) {
        const proyectoCreado = await modeloProyecto.create({
          nombre: args.nombre,
          presupuesto: args.presupuesto,
          lider: args.lider,
          objetivos: args.objetivos,
        });
        return proyectoCreado;
      } else {
        return null;
      }
    },
    editarProyecto: async (parent, args, context) => {
      if (context.userData) {
        const proyectoEditado = await modeloProyecto.findByIdAndUpdate(
          args._id,
          {
            nombre: args.nombre,
            objetivos: args.objetivos,
            presupuesto: args.presupuesto,
            lider: args.lider,
          },
          { new: true }
        );

        return proyectoEditado;
      } else {
        return null;
      }
    },

    editarObjetivo: async (parent, args, context) => {

      if(context.userData){

        const proyectoEditado = await modeloProyecto.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
      }else{
        return null; 
      }
      
    },

    actualizarEstadoProyecto: async (parent, args, context) => {
      if (context.userData) {
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
      } else {
        return null;
      }
    },

    finalizarProyecto: async (parent, args, context) => {
      if (context.userData) {
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
      } else {
        return null;
      }
    },

    eliminarProyecto: async (parent, args, context) => {
      if (context.userData) {
        const proyectoEliminado = await modeloProyecto.findOneAndDelete({
          _id: args._id,
        });
        return proyectoEliminado;
      } else {
        return null;
      }
    },
  },
};

module.exports = { resolversProyecto };
