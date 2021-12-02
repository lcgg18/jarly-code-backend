const { gql } = require( 'apollo-server-express');
const { tiposEnums } = require( '../graphql/enums/tipos');
const { tiposUsuario } = require( '../graphql/usuario/tipos');
const { tiposProyecto } = require( '../graphql/proyecto/tipos');
const { tiposAvance } = require( '../graphql/avance/tipos');
const { tiposInscripcion } = require('../graphql/inscripcion/tipos');
const { tiposAutenticacion } = require('../graphql/auth/tipos');



const tiposGlobales = gql`
  scalar Date
`;
const tipos = [tiposGlobales, tiposEnums, tiposUsuario, tiposProyecto, tiposAvance, tiposInscripcion, tiposAutenticacion];
module.exports = tipos
 