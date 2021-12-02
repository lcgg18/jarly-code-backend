const { modeloInscripcion } = require("../../models/inscripciones");


const resolverInscripciones = {


    Query: {
      Inscripciones: async (parent, args) => {
        const inscripciones = await modeloInscripcion.find().populate("estudiante").populate("proyecto");
        return inscripciones;
      },
    },
    Mutation: {
      crearInscripcion: async (parent, args) => {
        const inscripcionCreada = await modeloInscripcion.create({
          estado: args.estado,
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        });
        return inscripcionCreada;
      },
      aprobarInscripcion: async (parent, args) => {
        const inscripcionAprobada = await modeloInscripcion.findByIdAndUpdate(args.id, {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        },{new:true});
        return inscripcionAprobada;
      },
    },
  };
  
  module.exports =  { resolverInscripciones };