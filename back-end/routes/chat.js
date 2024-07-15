const express = require("express")
const router = express.Router()
const { createMessagingChannel } = require("../controllers/chatControllers")
const authRequired = require("../middleware/authRequired")

router.post("/createMessagingChannel", authRequired, createMessagingChannel)

module.exports = router
