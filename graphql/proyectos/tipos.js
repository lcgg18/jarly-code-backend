const { gql } = require ('apollo-server-express');

const tiposProyectos = gql`
  type Proyecto{
    _id: ID!
    nombre: String!
    appearsIn: [objetivos!]!
    presupuesto: Int!
    lider: 
    fechaInicio: Date!          //falta crear resolver Date
    fechaFin: Date!
    estado: Enum_Estadop!
    fase: Enum_Fasep!
  }


`;

module.exports = { tiposProyectos };
