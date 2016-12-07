var facebook_handler = require('../controllers/botkit').handler
var path = require('path')

module.exports = function (app) {
  // public pages=============================================
  // root
  app.get('/', function (req, res) {
    res.sendFile('views/broadcast.html');
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

    res.send('ok')
  })
}
