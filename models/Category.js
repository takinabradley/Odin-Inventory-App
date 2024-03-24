const { Schema, model } = require("mongoose")

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true],
      minLength: 3,
      maxLength: 100,
    }
  }
)

CategorySchema.virtual('url').get(function () {
  return `/inventory/categories/${this._id}`
})

module.exports = model("Category", CategorySchema)