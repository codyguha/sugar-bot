var facebook_handler = require('../controllers/botkit').handler

module.exports = function (app) {
  // public pages=============================================
  // root
  app.get('/', function (req, res) {
    res.render('home')
  })
  app.post('/', function (req, res) {
    var broadcast = req.body.broadcast
    var user = req.body.user
    console.log(">>>>>>>>>>>>>>>>>>>>>POST: "+ user + broadcast)
    facebook_handler(broadcastIt())
    res.render('home')
  })

  app.get('/webhook', function (req, res) {
    // This enables subscription to the webhooks
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.verify_token) {
      res.send(req.query['hub.challenge'])
    }
    else {
      res.send('Incorrect verify token')
    }
  })

  app.post('/webhook', function (req, res) {
    facebook_handler(req.body)
    console.log(">>>>>>>>>>>>>>>>>>>>>LOG: "+ req.body)
    res.send('ok')
  })
}
