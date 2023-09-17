//server/server.js

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth.js');

const PORT = process.env.PORT || 3001;
const app = express();
// create new instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();


  app.use(express.urlencoded({ extended: false }))
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, { 
    context: authMiddleware
   }));
  console.log('working');
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
}

  
  db.once('open', () => {
    app.listen(PORT, () => {
      
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
})

startApolloServer();