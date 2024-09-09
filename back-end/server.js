const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const recipeRoutes = require("./routes/recipe")
const userRoutes = require("./routes/user")
const chatRouters = require("./routes/chat")
const path = require("path")
const cors = require("cors")

// Initialize Express App
const app = express()

// Middleware
app.use(
  cors({
    origin: "https://fcbvttnrecipeapp.netlify.app",
  })
)
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/auth", userRoutes)
app.use("/api/recipe", recipeRoutes)
app.use("/api/chat", chatRouters)

// Connecting to db
mongoose
  .connect(process.env.Mong_URI)
  .then(() => {
    console.log("DB connected")
    const port = process.env.PORT || 3000
    app.listen(port, () =>
      console.log(`Listening for requests on port: ${process.env.PORT}`)
    )
  })
  .catch((error) => {
    console.error(error)
  })
