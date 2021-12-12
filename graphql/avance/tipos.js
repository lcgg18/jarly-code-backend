const { gql } = require ('apollo-server-express');

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }

  input FiltroAvances{
    _id: ID
    proyecto: String
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(filtro: FiltroAvances) : [Avance]
  }

  type Mutation {
    crearAvance(fecha: Date, descripcion: String!, proyecto: String!, creadoPor: String!): Avance
    editarAvance(id: String!, descripcion: String): Avance
  }
`;

module.exports = { tiposAvance };
