const { modeloUsuario } = require("../../models/usuarios");
const bcrypt = require ('bcrypt') ;

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      const usuarios = await modeloUsuario.find();
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await modeloUsuario.findOne({ _id: args._id });
      return usuario;
    },
    Estudiantes: async (parent, args) => {
      const estudiantes = await modeloUsuario.find({ rol: args.rol });
      return estudiantes;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
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

      if (Object.keys(args).includes("estado")) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await modeloUsuario.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      const usuarioEliminado = await modeloUsuario.findOneAndDelete({
        _id: args._id,
      });
      return usuarioEliminado;
    },
  },
};

module.exports = { resolversUsuario };
