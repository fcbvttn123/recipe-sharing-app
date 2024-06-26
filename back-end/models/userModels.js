const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const userModel = mongoose.model("User", userSchema)

userSchema.statics.signup = async (email, password) => {
  try {
    // validation
    if (!email || !password) {
      throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not valid")
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough")
    }
    const exists = await userModel.findOne({ email })
    if (exists) {
      throw Error("Email already in use")
    }
    // Hash and Add
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await userModel.create({ email, password: hash })
    return user
  } catch (error) {
    throw error
  }
}

userSchema.statics.login = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled")
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid")
  }
  const user = await userModel.findOne({ email })
  if (!user) {
    throw Error("Incorrect email")
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error("Incorrect password")
  }
  return user
}

module.exports = userModel
