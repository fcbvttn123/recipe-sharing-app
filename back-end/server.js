const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const recipeRoutes = require("./routes/recipe")
const userRoutes = require("./routes/user")
const chatRouters = require("./routes/chat")

// Initialize Express App
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use("/api/auth", userRoutes)
app.use("/api/recipe", recipeRoutes)
app.use("/api/chat", chatRouters)

// Connecting to db
mongoose
  .connect(process.env.Mong_URI)
  .then(() => {
    console.log("DB connected")
    app.listen(process.env.PORT, () =>
      console.log(`Listening for requests on port: ${process.env.PORT}`)
    )
  })
  .catch((error) => {
    console.error(error)
  })

/*

  Problems: 
    + PATCH Request: work for JSON Data but not for Form Data
    + Learn again JWT and read again the authRequired.js file
    + Learn using path 
    + Differences between "return error" and "throw error" in /routes/userModel.js --> userSchema.statics.signup

*/
