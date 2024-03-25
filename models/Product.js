const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, lowercase: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, minLength: 10, maxLength: 1000 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String },
  quantity: { type: Number, required: true, min: 0 },
});

ProductSchema.virtual("url").get(function () {
  return `/inventory/products/${this._id}`;
});

ProductSchema.virtual("inStock").get(function () {
  return this.quantity > 0 ? true : false
});

// Export model
module.exports = mongoose.model("Product", ProductSchema);