// import user model
const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth'); // Creates a JWT with the user's data and signs it with a secret-key.

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/User-Register)
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a user, sign a token, and send it back (to client/src/components/User-Login)
  // {body} is destructured req.body
  async login({ body }, res) {
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      const correctPw = await user.isCorrectPassword(body.password);
  
      if (!correctPw) {
        return res.status(400).json({ success: false, message: 'Incorrect password' });
      }
      
      const token = signToken(user);
      return res.status(200).json({ success: true, token, user });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  async logout (req, res) {
    try {
      // Clear the token from client-side storage (cookies or local storage)
      res.clearCookie('jwt'); // For cookies
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};