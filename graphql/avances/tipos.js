const { gql } = require ('apollo-server-express');

const tiposAvance = gql`

scalar Date

  type Avance {
    _id: ID!
    fecha: Date!    
    descripcion: String!
    observaciones: [String]
    proyecto: String!
    creadoPor: Usuario!    
  }

  type Query {
    Avances: [Avance]
    Avance(_id: String!): Avance    
  }

  type Mutation {
    crearAvance(
        fecha: Date!    
        descripcion: String!
        observaciones: [String]
        proyecto: String!
        creadoPor: Usuario!
    ): Avance

    editarAvance(
        _id: String!
        fecha: Date    
        descripcion: String
        observaciones: [String]
        proyecto: String!
        creadoPor: Usuario!
    ): Avance

    eliminarAvance(_id: String): Avance
  }
`;

module.exports = { tiposAvance };
