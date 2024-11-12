const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Error object for authentication failure
  AuthenticationError: new GraphQLError('Authentication failed. User could not be verified.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  // Middleware function to authenticate the token
  authMiddleware: function ({ req }) {
    // Look for token in multiple locations: body, query, or authorization header
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is in the authorization header, format it correctly
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is found, return the request without attaching any user data
    if (!token) {
      return req;
    }

    try {
      // Verify the token and extract user data
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;  // Attach the user data to the request object
    } catch (err) {
      console.log('Token verification failed:', err);
    }

    return req;  // Return the request object regardless of token validity
  },

  // Function to generate a token for a user
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Return the signed token with an expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
