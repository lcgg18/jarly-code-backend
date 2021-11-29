const { gql } = require ('apollo-server-express');

const tiposAvance = gql`

scalar Date

  type Avance {
    _id: ID!
    fecha: Date!    
    descripcion: String!
    observaciones: [Observaciones]
    proyecto: String!
    creadopor: Usuario!    
  }

  type Query {
    Avances: [Avance]
    Avance(_id: String!): Avance
    Lideres(creadoPor: String!): [Avance]
  }

  type Mutation {
    crearAvance(
        fecha: Date!    
        descripcion: String!
        observaciones: [Observaciones]
        proyecto: String!
        creadopor: Usuario!
    ): Avance

    editarAvance(
        _id: String!
        fecha: Date!    
        descripcion: String!
        observaciones: [Observaciones]
        proyecto: String!
        creadopor: Usuario!
    ): Avance

    eliminarAvance(_id: String, descripcion: String): Avance
  }
`;

module.exports = { tiposAvance };