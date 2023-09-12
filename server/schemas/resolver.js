const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        data = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return data;
      }
      throw new AuthenticationError();
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError();
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError();
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
