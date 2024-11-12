const express = require('express');
const path = require('path');
// Import ApolloServer and necessary methods
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

// Import the GraphQL schema (typeDefs and resolvers)
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Create and configure the ApolloServer instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Initialize Apollo server asynchronously
const initializeApolloServer = async () => {
  // Start Apollo server
  await apolloServer.start();
  
  // Middleware for parsing the request body
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // Set up GraphQL endpoint with authentication middleware
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware
  }));

  // Serve static files from the client build folder in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Fallback route for any undefined route (important for single-page apps)
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  // Connect to the database and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
      console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the function to start Apollo Server
initializeApolloServer();
