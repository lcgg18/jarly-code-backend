const jwt = require('jsonwebtoken') ;
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.KEY_JWT

const validateToken = (token) => {
  if (token) {
    const verification = jwt.verify(token, secret, (err, data) => {
      if (data) {
        return {
          data: data,
        };
      }
      if (err) {
        return {
          error: err,
        };
      }
    });
    return verification;
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, secret , {
    expiresIn: '24h',
  });
};


module.exports = { generateToken, validateToken };