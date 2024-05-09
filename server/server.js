const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const { expressMiddleware } = require('@apollo/server/express4');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth'); // Import authMiddleware from utils/auth.js

// Set up port and create a new instance of an Express server
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    console.log("Token:", token); // Logs the token to the console -- having issues w/ deleting a user. 
    let user = null;
    try {
      if (token) {
        user = authMiddleware({ context: { token } }); // Use authMiddleware to decode token
        console.log("Decoded user:", user); // Logs the decoded user to the console -- having issues w/ deleting a user.
      }
    } catch (error) {
      console.log("Invalid token");
    }
    return { user };
  },
});

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();

  // Middleware for parsing requests
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apollo Server middleware
  app.use('/graphql', expressMiddleware(server));

  // Static file serving in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
