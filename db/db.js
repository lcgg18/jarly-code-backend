const { connect } = require('mongoose')


const conectarBD = async () => {
  return await connect(process.env.DB_CONNECT)
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

module.exports = conectarBD; 
 