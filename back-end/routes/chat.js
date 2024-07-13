const express = require("express")
const router = express.Router()

router.post("/test", (req, res) => {
  res.json({ message: "test successfully" })
})

module.exports = router
