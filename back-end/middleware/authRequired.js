const jwt = require("jsonwebtoken")
const User = require("../models/userModels")

async function authRequired(req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  // Because token is 'Bearer fsjdfbdshfbhsdbfdsbfdsbfmsdnbfhkdsbfhdsbf'
  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    // The select() function will only return the id of the document instead of the whole document
    req.user = await User.findOne({ _id }).select("_id")
    next()
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" })
  }
}

module.exports = authRequired
