const { modeloAvance } = require ('../../models/avances');

const resolversAvance = {
  Query: {
    Avances: async (parent, args, context) => {

      if(context.userData){
        
        const avances = await modeloAvance.find().populate('proyecto').populate('creadoPor');
        return avances;
      }else{
        return null; 
      }
    },
    filtrarAvance: async (parents, args, context) => {

      if(context.userData){
        const avanceFiltrado = await modeloAvance.find({...args.filtro}).populate('creadoPor').populate('proyecto');
        return avanceFiltrado;
        
      }else{
        return null; 
      }
    },
    
  },
  Mutation: {
    crearAvance: async (parents, args, context) => {

      if(context.userData){
        
        const avanceCreado = modeloAvance.create({
          fecha: Date.now(),
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        });
        return avanceCreado;
      }else{
        return null; 
      }
    },

    editarAvance: async (parent, args, context) => {
      if(context.userData){
        
        const editarAvance = modeloAvance.findByIdAndUpdate(args.id,
          {
            descripcion: args.descripcion,
          },
          { new: true }
          )
          return editarAvance;
      }else{
        return null; 
      }
    }
  },
};

module.exports = { resolversAvance };
