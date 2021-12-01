const { gql } = require ('apollo-server-express');

const tipoInscripcion = gql`
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: Usuario!
  }type Query {
    Inscripciones: [Inscripcion]
  }
  type Mutation {
    crearInscripcion(
      estado: Enum_EstadoInscripcion
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    aprobarInscripcion(id: String!): Inscripcion
  }
`;

module.exports = { tipoInscripcion };