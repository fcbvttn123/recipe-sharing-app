const express = require("express")
const {
  signupUser,
  loginUser,
  getAllEmails,
} = require("../controllers/userControllers")
const {
  checkIfAccountExists,
} = require("../controllers/googleAccountControllers")
const router = express.Router()
const authRequired = require("../middleware/authRequired")

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/checkIfGoogleAccountExists", checkIfAccountExists)
router.get("/getAllEmails", authRequired, getAllEmails)

module.exports = router
