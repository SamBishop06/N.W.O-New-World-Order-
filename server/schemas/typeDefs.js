const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type AuthToken {
    token: String
  }

  type Post {
    _id: ID
    user: User
    message: String
    timestamp: String
  }

  type Attachment {
    _id: ID!
    posts: [Post!]!
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input PostInput {
    user: ID!
    message: String
    timestamp: String
  }

  type Query {
    users: [User]
    posts: [Post]
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): UserDeleteResponse
    getUserProfile: User
    login(email: String!, password: String!): AuthToken
    logout: Boolean
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Post
  }

  type UserDeleteResponse {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;