const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');

// used by ApolloServer and graphql
const { typeDefs, resolvers } = require('./schemas')
// JWT middleware
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create new instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,

});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`GraphQL running http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

startApolloServer(typeDefs, resolvers);