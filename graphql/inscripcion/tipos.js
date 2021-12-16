const { gql } = require( 'apollo-server-express');



const tiposInscripcion = gql`
type Inscripcion {
  _id: ID!
  estado: Enum_EstadoInscripcion
  fechaIngreso: Date
  fechaEgreso: Date
  proyecto: Proyecto!
  estudiante: Usuario!
}
input FiltrarInscripciones{
  _id: ID
  proyecto: String
  estudiante: String
}
type Query {
  Inscripciones: [Inscripcion]
  InscripcionesFiltradas(filtro: FiltrarInscripciones): [Inscripcion]
}
type Mutation {
  crearInscripcion(
    estado: Enum_EstadoInscripcion
    proyecto: String!
    estudiante: String!
  ): Inscripcion
  aprobarInscripcion(id: String!): Inscripcion
  rechazarInscripcion(id: String!): Inscripcion
}
`;

module.exports = { tiposInscripcion };