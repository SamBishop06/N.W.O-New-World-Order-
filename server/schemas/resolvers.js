const bcrypt = require('bcrypt'); // For comparing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const { User, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const SECRET_KEY = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('posts'); // Populate the posts field for each user
    },
    posts: async () => {
      return await Post.find({});
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error('Email is already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // Create the user
        const user = new User({
          username: input.username,
          email: input.email,
          password: hashedPassword
        });

        // Save the user to the database
        const newUser = await user.save();

        // Generate JWT token for the newly created user
        const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1d' });

        return {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          token
        };
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    deleteUser: async (_, { id }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }

        // Check if the authenticated user is the same as the user being deleted
        if (context.user.id !== id) {
          throw new Error('Unauthorized: You can only delete your own account');
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          throw new Error('User not found');
        }

        return {
          success: true,
          message: 'User deleted successfully'
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to delete user: ${error.message}`
        };
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new AuthenticationError('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1d' });

        return {
          token
        };
      } catch (error) {
        throw new AuthenticationError(`Login failed: ${error.message}`);
      }
    },
    createPost: async (_, { input }) => {
      try {
        // Create the post
        const post = new Post({
          user: input.user,
          message: input.message,
          timestamp: new Date().toISOString()
        });

        // Save the post to the database
        const newPost = await post.save();

        return newPost;
      } catch (error) {
        throw new Error(`Failed to create post: ${error.message}`);
      }
    },
    updatePost: async (_, { id, input }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
    
        // Find the post by ID
        const post = await Post.findById(id);
    
        // Check if the post exists
        if (!post) {
          throw new Error('Post not found');
        }
    
        // Check if the authenticated user is the owner of the post
        if (post.user.toString() !== context.user.id) {
          throw new Error('Unauthorized: You can only update your own post');
        }
    
        // Update the post with the new input data
        post.message = input.message || post.message; // Update message if provided
        post.timestamp = new Date().toISOString(); // Update timestamp to current time
    
        // Save the updated post
        const updatedPost = await post.save();
    
        return updatedPost;
      } catch (error) {
        throw new Error(`Failed to update post: ${error.message}`);
      }
    },
    // Add other mutation resolvers here...
  },
  User: {
    posts: async (parent) => {
      return await Post.find({ user: parent._id });
    }
  },
};

module.exports = resolvers;
