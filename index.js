const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const { ApolloServer } = require("apollo-server-express");
const tipos = require("./graphql/types");
const resolvers = require("./graphql/resolvers");
const dotenv = require("dotenv");
const { validateToken } = require("./utils/tokenUtils.js");


dotenv.config();

const getUserData = (token) => {
  const verificacion = validateToken(token.split(" ")[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
  context: ({ req }) => {
   
    const token = req.headers.authorization ?? null;

    if (token) {
      const userData = getUserData(token);
      if (userData) {
        return { userData };
      }
    }
    return null;
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
  await connectDB();
  await server.start();
  server.applyMiddleware({ app });

  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});