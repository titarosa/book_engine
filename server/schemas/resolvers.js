const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if user is authenticated in context
      if (context.user) {
        try {
          const user = await User.findById(context.user._id).select('-__v -password');
          return user;
        } catch (error) {
          throw new Error('Error retrieving user data');
        }
      }

      throw AuthenticationError;
    },
  },

  Mutation: {
    // Create a new user and sign token
    addUser: async (parent, args) => {
      try {
        const newUser = await User.create(args);
        const token = signToken(newUser);
        return { token, user: newUser };
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
  
    // User login with email and password
    login: async (parent, { email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          throw AuthenticationError;
        }
        const isPasswordCorrect = await existingUser.isCorrectPassword(password);
        if (!isPasswordCorrect) {
          throw AuthenticationError;
        }
        const token = signToken(existingUser);
        return { token, user: existingUser };
      } catch (error) {
        throw new Error('Authentication failed');
      }
    },
  
    // Save a new book to the user's collection
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: bookData } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error('Error saving book');
        }
      }
      throw AuthenticationError;
    },
  
    // Remove a book from the user's saved books list
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error('Error removing book');
        }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
