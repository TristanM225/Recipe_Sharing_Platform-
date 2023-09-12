const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError();
    },
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
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
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);

      return { token, newUser };
    },
    saveRecipe: async (parent, { recipeToSave }, context) => {
      if (context.user) {
        const newRecipe = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: recipeToSave } },
          { new: true }
        );

        return newRecipe;
      }
      throw new AuthenticationError();
    },
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const pullRecipe = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedRecipes: { recipeId } } },
          { new: true }
        );

        return pullRecipe;
      }
    },
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        const newPost = await Post.create({
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: newPost._id } }
        );

        return newPost;
      }
      throw new AuthenticationError();
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError();
    },
    removePost: async (parent, { postId }, context) => {
        if (context.user) {
            const pullPost = await Post.findOneAndDelete({
                _id: postId,
                postAuthor: context.user.username,
            });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { posts: pullPost._id } },
            );

            return pullPost;
        }
        throw new AuthenticationError();
    },
    removeComment: async (parent, { postId, commentId }, context) => {
        if (context.user) {
            return Post.findOneAndUpdate(
                { _id: postId },
                {
                    $pull: {
                        comments: {
                            _id: commentId,
                            commentAuthor: context.user.username,
                        },
                    },
                },
                { new: true },
            );
        }
        throw new AuthenticationError();
    },
  },
};

module.exports = resolvers;
