const mongoose = require("mongoose")

const Schema = mongoose.Schema

const googleAccountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("GoogleAccount", googleAccountSchema)
