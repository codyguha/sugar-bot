var facebook_handler = require('../controllers/botkit').handler
var broadcaster = require('../controllers/botkit').broadcast

module.exports = function (app) {

  // app.get('/', function (req, res) {
  //   res.render('home')
  // })

  // app.post('/', function (req, res) {
  //   var text = req.body.broadcast
  //   var broadcast=eval("("+text+")");
  //   broadcaster(broadcast)
  //   res.render('home')
  // })

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
