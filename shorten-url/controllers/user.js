const User = require('../models/user')
const { setUser } = require('../service/auth')

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body

  await User.create({
    name,
    email,
    password,
  })
  return res.render('/')
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body

  const user = await User.findOne({ email, password })
  if (!user) {
    res.render('login', {
      error: 'Invalid Username or Password',
    })
  }

  const token = setUser(user)
  res.cookie('uid', token)

  return res.redirect('/')
}

module.exports = { handleUserSignUp, handleUserLogin }
