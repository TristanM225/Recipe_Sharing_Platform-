const { Schema } = require("mongoose");

const ingredientSchema = new Schema({
  ingredientId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aisle: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  consistency: {
    type: String,
  },
  unit: {
    type: String,
  },
  meta: [
    {
      type: String,
    },
  ],
});

module.exports = ingredientSchema;
