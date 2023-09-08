const { Schema } = require('mongoose');

// TODO: figure out what fields we want in the recipe
const recipeSchema = new Schema({
  author: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = recipeSchema;
