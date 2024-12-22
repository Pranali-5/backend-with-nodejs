const express = require('express')
const router = express.Router()
const URL = require('../models/url')

router.get('/', async (req, res) => {
  try {
    // Only fetch URLs created by the current user
    const urls = req.user ? 
      await URL.find({ createdBy: req.user._id }) : 
      [];
      
    return res.render('home', {
      urls: urls,
      user: req.user
    })
  } catch (error) {
    return res.render('home', {
      urls: [],
      user: req.user
    })
  }
})

router.get('/signup', async (req, res) => {
  return res.render('signup')
})

router.get('/login', async (req, res) => {
  return res.render('login')
})

module.exports = router
