const { gql } = require ('apollo-server-express');

const tiposAutenticacion = gql`
  type Token {
    token: String
    error: String
  }
  type Mutation {
    registro(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ): Token!
    login(correo: String!, password: String!): Token

    editarPerfil(
      _id: String!
      nombre: String
      apellido: String
      identificacion: String
      correo: String
      password: String
      ):String
    
    refreshToken: Token
  }
`;
module.exports = { tiposAutenticacion };
