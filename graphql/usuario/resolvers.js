const { modeloUsuario } = require("../../models/usuarios");
const bcrypt = require ('bcrypt') ;

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args, context) => {

      if(context.userData){

        const usuarios = await modeloUsuario.find()
        return usuarios;
        
        
      }else{
        return null; 
      }
    },
    UsuariosFiltrados: async (parent, args, context) => {
      
      if(context.userData){
        const usuarios = await modeloUsuario.find({ ...args.filtro });
        return usuarios;
        
      }else{
        return null; 
      }
    },
    Usuario: async (parent, args, context) => {

      if(context.userData){
        const usuario = await modeloUsuario.findOne({ _id: args._id });
        return usuario;
        
      }else{
        return null; 
      }
    },
    Estudiantes: async (parent, args, context) => {

      if(context.userData){
        const estudiantes = await modeloUsuario.find({ rol: args.rol });
        return estudiantes;
        
      }else{
        return null; 
      }
    },
  },
  Mutation: {
    crearUsuario: async (parent, args, context) => {

      if(context.userData){
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
        
      }else{
        return null; 
      }

    },
    editarUsuario: async (parent, args, context) => {

      if(context.userData){
        
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
      }else{
        return null; 
      }

    },
    eliminarUsuario: async (parent, args, context) => {

      if(context.userData){
        
        const usuarioEliminado = await modeloUsuario.findOneAndDelete({
          _id: args._id,
        });
        return usuarioEliminado;
      }else{
        return null; 
      }
    },
  },
};

module.exports = { resolversUsuario };
