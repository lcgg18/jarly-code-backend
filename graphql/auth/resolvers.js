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
      const usuarioEncontrado = await modeloUsuario.findOne({ correo: args.correo });
      if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
        return {
          token: generateToken({
            _id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
            identificacion: usuarioEncontrado.identificacion,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol,
            estado: usuarioEncontrado.estado,
          }),
        };
      } else {
        return {
          error: 'not auth',
        };
      }
   },

   editarPerfil: async (parent, args) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(args.password, salt);
    const usuarioEditado = await modeloUsuario.findByIdAndUpdate(
      args._id,
      {
      nombre: args.nombre,
      apellido: args.apellido,
      identificacion: args.identificacion,
      correo: args.correo,
      rol: args.rol,
      password: hashedPassword,
    },
    { new: true }
    );
    return usuarioEditado._id;
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