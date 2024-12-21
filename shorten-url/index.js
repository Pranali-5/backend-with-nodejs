const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectMongoDb } = require('./connect')
const URL = require('./models/url')
const { restrictToLoginUserOnly, checkAuth } = require('./middlewares/auth')

const staticRouter = require('./routes/staticRouter')
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')

const app = express()
const PORT = 8001

connectMongoDb('mongodb://127.0.0.1:27017/short-url')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get('/test', async (req, res) => {
  const allUrls = await URL.find({})
  return res.render('home', {
    urls: allUrls,
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/url', restrictToLoginUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/', checkAuth, staticRouter)

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timeStamps: Date.now(),
        },
      },
    }
  )
  res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))
