const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

// Initialize Express App
const app = express()

// Middleware
app.use(express.json())

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
