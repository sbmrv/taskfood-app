const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  selectedType: {
    type: String,
    enum: ["main course", "side dishes"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  base64Image: {
    type: String,
  },
});

module.exports = mongoose.model("Dish", dishSchema);
