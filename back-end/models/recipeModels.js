const mongoose = require("mongoose")

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

recipeSchema.methods.like = async function (email) {
  try {
    if (!this.likedBy.includes(email)) {
      this.likedBy.push(email)
      await this.save()
    }
    return this
  } catch (err) {
    console.error(err)
  }
}

recipeSchema.methods.unlike = async function (email) {
  try {
    if (this.likedBy.includes(email)) {
      if (this.likedBy.length > 1) {
        this.likedBy.filter((e) => e !== email)
      } else {
        this.likedBy = []
      }
      await this.save()
    }
    return this
  } catch (err) {
    console.error(err)
  }
}

module.exports = mongoose.model("Recipe", recipeSchema)
