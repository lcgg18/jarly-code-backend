const { gql } = require ('apollo-server-express');

const tiposProyectos = gql`

  scalar Date

  type objetivo{
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
    objetivos: [objetivo]
    presupuesto: Int!
    lider: Usuario
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
  }

  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
    Proyectos(estado: String!): [Estados]
    Proyectos(fase: String!): [Fase]
  }
  
   type Mutation {
   
    crearProyecto(
      nombre: String!
      objetivos: [crearObjetivo]
      presupuesto: Int
      lider: Usuario!
      fechainicio: Date!
      fechaFin: Date!
      estado: Enum_EstadoProyecto!
      fase: Enum_FaseProyecto!
    ): Proyecto
    
    editarProyecto(
      _id: String!
      nombre: String!
      objetivos: [objetivo]
      presupuesto: Int
      lider: Usuario!
      fechainicio: Date!
      fechaFin: Date!
      estado: Enum_EstadoProyecto!
      fase: Enum_FaseProyecto!
    ): Proyecto
    
    eliminarProyecto(_id: String): Proyecto
  }

`;

module.exports = { tiposProyectos };
