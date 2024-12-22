const User = require('../models/user')
const { setUser } = require('../service/auth')

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body
    
    await User.create({
      name,
      email,
      password,
    })
    return res.redirect('/login')
  } catch (error) {
    console.error('Signup error:', error)
    return res.render('signup', {
      error: 'Failed to create account. Please try again.'
    })
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })
    if (!user) {
      return res.render('login', {
        error: 'Invalid Username or Password',
      })
    }

    const token = setUser(user)
    res.cookie('uid', token)
    return res.redirect('/')
  } catch (error) {
    console.error('Login error:', error)
    return res.render('login', {
      error: 'Login failed. Please try again.'
    })
  }
}

module.exports = { handleUserSignUp, handleUserLogin }
