const { modeloInscripcion } = require("../../models/inscripciones");


const resolverInscripciones = {


    Query: {
      Inscripciones: async (parent, args, context) => {
        if(context.userData){
        
          const inscripciones = await modeloInscripcion.find().populate("estudiante").populate("proyecto");
          return inscripciones;
        }else{
          return null; 
        }

      },
      InscripcionesFiltradas: async (parent, args, context) => {

        if(context.userData){
          const inscripciones = await modeloInscripcion.find({ ...args.filtro }).populate("estudiante").populate("proyecto");
          return inscripciones;
        
        }else{
          return null; 
        }
      },
    },
    Mutation: {
      crearInscripcion: async (parent, args, context) => {

        if(context.userData){
        
          const inscripcionCreada = await modeloInscripcion.create({
            estado: args.estado,
            proyecto: args.proyecto,
            estudiante: args.estudiante,
          });
          return inscripcionCreada;
        }else{
          return null; 
        }
      },
      aprobarInscripcion: async (parent, args, context) => {

        if(context.userData){
        
          const inscripcionAprobada = await modeloInscripcion.findByIdAndUpdate(args.id, {
            estado: 'ACEPTADO',
            fechaIngreso: Date.now(),
          },{new:true});
          return inscripcionAprobada;
        }else{
          return null; 
        }
      },
      rechazarInscripcion: async (parent, args) => {

        if(context.userData){

          const inscripcionRechazada = await modeloInscripcion.findByIdAndUpdate(args.id, {
          estado: 'RECHAZADO'
        },{new:true});
        return inscripcionRechazada;
        }else{
          return null; 
        }
        
      },

    },
  };
  
  module.exports =  { resolverInscripciones };