const { gql } = require ('apollo-server-express');

const tiposProyectos = gql`
  type Proyecto{
    _id: ID!
    nombre: String!
    appearsIn: [objetivos!]!
    presupuesto: Int!
    lider: Enum_Usuario!
    fechaInicio: Date!          //falta crear resolver Date
    fechaFin: Date!
    estado: Enum_Estadop!
    fase: Enum_Fasep!
  }

  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
    Proyectos(estado: String!): [Estados]
    proyectos(fase: String!): [Fase]
  }
  
   type Mutation {
   
    crearProyecto(
      nombre: String!
      objetivos: [objetivos!]
      presupuesto: Int
      lider: Enum_usuario!
      fechainicio: Date!
      fechaFin: Date!
      estado: Enum_Estadop!
      fase: Enum_Fasep!
    ): Usuario
    
    editarProyecto(
      _id: String!
      nombre: String!
      objetivos: [objetivos!]
      presupuesto: Int
      lider: Enum_usuario!
      fechainicio: Date!
      fechaFin: Date!
      estado: Enum_Estadop!
      fase: Enum_Fasep!
    ): Usuario
    
    eliminarProyecto(_id: String): Proyecto
  }

`;

module.exports = { tiposProyectos };
