const { gql } = require('apollo-server-express');

const tiposProyecto = gql`
  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input crearObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date
    fechaFin: Date
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: Usuario!
    objetivos: [Objetivo]
    avances: [Avance]
    inscripciones: [Inscripcion]
  }



  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
  }

  type Mutation {
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      fechaInicio: Date
      fechaFin: Date
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      lider: String!
      objetivos: [crearObjetivo]
    ): Proyecto

    editarProyecto(
      _id: String!
      nombre: String
      presupuesto: Float
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      lider: String
      objetivos: [crearObjetivo] 
    ): Proyecto

    actualizarEstadoProyecto(
      _id: String!
      estado: Enum_EstadoProyecto
      fechaInicio: Date
    ): Proyecto

    finalizarProyecto(
      _id: String!
      fase: Enum_FaseProyecto
      fechaFin: Date
    ): Proyecto
    
    eliminarProyecto(_id: String): Proyecto
  }
`;

module.exports = { tiposProyecto };
