const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
  try {
    const body = req.body
    if (!body.url) {
      return res.status(400).json({ error: 'url is required' })
    }
    
    const shortID = shortid.generate()
    const allUrls = await URL.find({ createdBy: req.user._id })
    
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    })

    return res.render('home', { 
      id: shortID,  
      urls: allUrls,
      user: req.user 
    })
  } catch (error) {
    console.error('URL generation error:', error)
    return res.render('home', {
      error: 'Failed to create short URL. Please try again.',
      urls: [],
      user: req.user
    })
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    
    if (!result) {
      return res.status(404).json({ error: 'URL not found' })
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return res.status(500).json({ error: 'Failed to get analytics' })
  }
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics }
