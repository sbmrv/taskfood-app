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
    default:
      "https://static.vecteezy.com/system/resources/previews/005/542/677/non_2x/modern-shape-plate-with-spoon-and-fork-logo-symbol-icon-graphic-design-illustration-idea-creative-vector.jpg",
  },
});

module.exports = mongoose.model("Dish", dishSchema);
