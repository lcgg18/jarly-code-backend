const { modeloProyecto } = require("../../models/proyectos");

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await modeloProyecto.find().populate('lider');
      return proyectos;
    },
    
    Proyecto: async (parent, args) => {
      const proyecto = await modeloProyecto.findOne({ _id: args._id });
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
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
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
          fechaInicio: args.fechaInicio,
          fechaFin: args.fechaFin,
          estado: args.estado,
          fase: args.fase,
        },
        { new: true }
      );

      return proyectoEditado;
    },
    
    eliminarProyecto: async (parent, args) => {
      const proyectoEliminado = await modeloProyecto.findOneAndDelete({
        _id: args._id,
      });
      return proyectoEliminado;
    },
  },
};

module.exports = { resolversProyectos };
