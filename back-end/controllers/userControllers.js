function signupUser(req, res) {
  res.json({ message: "sign up" })
}
function loginUser(req, res) {
  res.json({ message: "sign in" })
}

module.exports = {
  signupUser,
  loginUser,
}
