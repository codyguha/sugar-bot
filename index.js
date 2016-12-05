var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/broadcast.html'));
})
app.post('/',function(req,res){
  var broadcast = req.body.broadcast
  var user = req.body.user
  console.log(req.body.broadcast)
  res.send(user + ' says: "' + broadcast + '"')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
