const express = require("express")
const { signupUser, loginUser } = require("../controllers/userControllers")
const {
  checkIfAccountExists,
} = require("../controllers/googleAccountControllers")
const router = express.Router()

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/checkIfGoogleAccountExists", checkIfAccountExists)

module.exports = router
