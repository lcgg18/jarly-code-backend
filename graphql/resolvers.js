const { resolversProyecto } = require("../graphql/proyecto/resolvers");
const { resolversUsuario } = require("../graphql/usuario/resolvers");
const { resolversAvance } = require("../graphql/avance/resolvers");
const { resolverInscripciones } = require("../graphql/inscripcion/resolvers");
const { resolversAutenticacion } = require("../graphql/auth/resolvers");

const resolvers = [
  resolversUsuario,
  resolversProyecto,
  resolversAvance,
  resolverInscripciones,
  resolversAutenticacion
];

module.exports = resolvers;
