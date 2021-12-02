const { gql } = require ('apollo-server-express');

const tiposProyecto = gql`

  type Objetivo{
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }
  
  input crearObjetivo{
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  type Proyecto{
    _id: ID!
    nombre: String!
    objetivos: [Objetivo]
    presupuesto: Float!
    lider: Usuario!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
  }

  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
  }
  
   type Mutation {
   
    crearProyecto(
      nombre: String!
      objetivos: [crearObjetivo]
      presupuesto: Float!
      lider: String!
      fechainicio: Date!
      fechaFin: Date!
      estado: Enum_EstadoProyecto!
      fase: Enum_FaseProyecto!
    ): Proyecto
    
    editarProyecto(
      _id: String!
      nombre: String
      objetivos: [crearObjetivo]
      presupuesto: Float
      lider: String
      fechainicio: Date
      fechaFin: Date
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
    ): Proyecto
    
    eliminarProyecto(_id: String): Proyecto
  }

`;

module.exports = { tiposProyecto };
