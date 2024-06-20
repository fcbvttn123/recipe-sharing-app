const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ message: "GET recipes" })
})

router.get("/:id", (req, res) => {
  res.json({ message: `GET recipe: ${req.params.id}` })
})

router.post("/", (req, res) => {
  res.json({ message: "POST recipes" })
})

router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE recipe: ${req.params.id}` })
})

router.patch("/:id", (req, res) => {
  res.json({ message: `UPDATE recipe: ${req.params.id}` })
})

module.exports = router
