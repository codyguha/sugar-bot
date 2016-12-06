var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var Botkit = require('botkit/lib/Botkit.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var controller = Botkit.facebookbot({
    debug: true,
    access_token: process.env.page_token,
    verify_token: process.env.verify_token,
});

var bot = controller.spawn({
});


controller.on('tick', function(bot, event) { });
controller.on('message_received', function(bot, incoming) {
bot.reply(incoming, incoming.text)
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/broadcast.html'));
})
app.post('/',function(req,res){
  var broadcast = req.body.broadcast
  var user = req.body.user
  res.send(user + ' says: "' + broadcast + '"')
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: '+process.env.PORT)
  controller.setupWebserver(process.env.PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');
    });
  });
})
