var facebook_handler = require('../controllers/botkit').handler
var broadcaster = require('../controllers/botkit').broadcast

module.exports = function (app) {

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

  app.get('/list',
    function(req, res){
      res.render('list', {list: ["Sugar", "Cane Sugar", "Sucrose", "Fructose", "Lactose", "Corn Syrup", "Maltodextrin", "Dextrose", "Glucose", "Evaporated Cane Juice", "Molasses", "High Fructose Corn Syrup", "Coconut Sugar", "Palm Sugar", "Rice Malt Syrup", "Malt", "Fruit Juice Concentrate", "Honey", "Maple Syrup", "Agave","Date Syrup", "Stevia", "Monk Fruit Juice", "Luo Han Guo", "Thaumatin", "Unrefined Sugar", "Mannitol", "Xylitol", "Sorbitol", "Tagatose", "Isomaltulose", "Polydextrose", "Aspartame (i.e. Equal)", "Sucralose (i.e. Splenda)", "Acesulphame Potassium", "Saccharin (i.e. Sweet ‘N Low)"]});
  });

  app.post('/list',function(req,res){
    var cnslbody = JSON.stringify(req.body, null, 4);
    var arr = [req.body]
    var personalized = []
    for (var i = 1; i < arr.length; i++){
        var obj = arr[i];
        for (var key in obj){
            personalized.push(key)
        }
    }

  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + personalized)
    broadcaster(personalized.toString(), req.body.fb_id)
  })


}
