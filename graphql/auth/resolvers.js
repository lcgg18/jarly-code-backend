const { modeloUsuario } = require('../../models/usuarios.js');
const bcrypt = require ('bcrypt') ;
const { generateToken } = require ('../../utils/tokenUtils.js') ;

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await modeloUsuario.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });
      
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          rol: usuarioCreado.rol,
        }),
      };
    } catch (e) {
      return {
        error: e,
      };
    }
    },

    login: async (parent, args) => {
      const usuarioEcontrado = await modeloUsuario.findOne({ correo: args.correo });
      if (await bcrypt.compare(args.password, usuarioEcontrado.password)) {
        return {
          token: generateToken({
            _id: usuarioEcontrado._id,
            nombre: usuarioEcontrado.nombre,
            apellido: usuarioEcontrado.apellido,
            identificacion: usuarioEcontrado.identificacion,
            correo: usuarioEcontrado.correo,
            rol: usuarioEcontrado.rol,
            estado: usuarioEcontrado.estado,
          }),
        };
      } else {
        return {
          error: 'not auth',
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      if (!context.userData) {
        return {
          error: 'token no valido',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
            estado: context.userData.estado,
          }),
        };
      }
      // valdiar que el contexto tenga info del usuario. si si, refrescar el token
      // si no devolver null para que en el front redirija al login.
    },
  },
};


module.exports = { resolversAutenticacion };