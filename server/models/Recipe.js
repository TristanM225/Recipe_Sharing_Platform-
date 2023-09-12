const { Schema } = require("mongoose");
const ingredientSchema = require("./Ingredient");

// TODO: figure out what fields we want in the recipe
const recipeSchema = new Schema({
  recipeId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: [ingredientSchema],
  analyzedInstructions: [
    {
      type: String,
    },
  ],
  servings: {
    type: Number,
  },
  readyInMinutes: {
    type: Number,
  },
  // May use in the
  // instructions: {
  //   type: String,
  // },
  // pricePerServing: {
  //   type: Decimal128,
  // },
  // cheap: {
  //   type: Boolean,
  // },
  // dairyFree: {
  //   type: Boolean,
  // },
  // glutenFree: {
  //   type: Boolean,
  // },
  // ketogenic: {
  //   type: Boolean,
  // },
  // lowFodmap: {
  //   type: Boolean,
  // },
  // sustainable: {
  //   type: Boolean,
  // },
  // vegan: {
  //   type: Boolean,
  // },
  // vegetarian: {
  //   type: Boolean,
  // },
  // veryHealthy: {
  //   type: Boolean,
  // },
  // veryPopular: {
  //   type: Boolean,
  // },
  // whole30: {
  //   type: Boolean,
  // },
  // dishTypes: [
  //   {
  //     type: String,
  //   },
  // ],
  // healthScore: {
  //   type: Decimal128,
  // },
  // winePairing: [
  //   {
  //     type: String,
  //   },
  // ],
  image: {
    type: String,
  },
  sourceLink: {
    type: String,
  },
});

module.exports = recipeSchema;
