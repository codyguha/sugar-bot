var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var path = require('path')


app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

require('./app/routes/routes')(app)

app.set('port', (process.env.PORT || 5000))

http.listen(app.get('port'), function () {
  console.log('listening on port ' + app.get('port'))
})
