var facebook_handler = require('../controllers/botkit').handler
var broadcaster = require('../controllers/botkit').broadcast
var orderedlist3 = require('../controllers/botkit').orderedlist3
var orderedlist4 = require('../controllers/botkit').orderedlist4
var orderedlist5 = require('../controllers/botkit').orderedlist5
var orderedlist6 = require('../controllers/botkit').orderedlist6
var attitudinal = require('../controllers/botkit').attitudinal
var compromise = require('../controllers/botkit').compromise

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
      res.render('list', {list: list});
  });

  app.get('/list2',
    function(req, res){
      res.render('list2', {list: userslist});
  });

  app.get('/list3',
    function(req, res){
      res.render('list3', {list: userslist});
  });

  app.get('/list4',
    function(req, res){
      res.render('list4', {list: userslist});
  });
  app.get('/list5',
    function(req, res){
      res.render('list5', {list: userslist});
  });
  app.get('/list6',
    function(req, res){
      res.render('list6', {list: userslist});
  });
  app.get('/products',
    function(req, res){
      res.render('products', {list: userslist});
  });
  app.get('/personality',
    function(req, res){
      res.render('personality_sugar');
  });
  app.get('/personality2',
    function(req, res){
      res.render('personality_sweetners');
  });

  var userslist
  var list = ["Sugar", "Cane Sugar", "Sucrose", "Fructose", "Lactose", "Corn Syrup", "Maltodextrin", "Dextrose", "Glucose", "Evaporated Cane Juice", "Molasses", "High Fructose Corn Syrup", "Coconut Sugar", "Palm Sugar", "Rice Malt Syrup", "Malt", "Fruit Juice Concentrate", "Honey", "Maple Syrup", "Agave","Date Syrup", "Stevia", "Monk Fruit Juice", "Luo Han Guo", "Thaumatin", "Unrefined Sugar", "Mannitol", "Xylitol", "Sorbitol", "Tagatose", "Isomaltulose", "Polydextrose", "Aspartame (i.e. Equal)", "Sucralose (i.e. Splenda)", "Acesulphame Potassium", "Saccharin (i.e. Sweet ‘N Low)"]
  app.post('/list',function(req,res){
    var facebook_id = req.body.fb_id
    // var cnslbody = JSON.stringify(req.body, null, 4);
    var keys = Object.keys(req.body)
    keys.splice(0, 1);
    var scoped_list = keys
    userslist = scoped_list
  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + scoped_list)
    broadcaster(facebook_id, scoped_list)
  })

  app.post('/list2',function(req,res){
    var facebook_id = req.body.fb_id
    // var cnslbody = JSON.stringify(req.body, null, 4);
    var keys = Object.keys(req.body)
    keys.splice(0, 1);
    var natural_order_list = keys
  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + natural_order_list)
    orderedlist3(facebook_id)
  })

  app.post('/list3',function(req,res){
    var facebook_id = req.body.fb_id
    // var cnslbody = JSON.stringify(req.body, null, 4);
    var keys = Object.keys(req.body)
    keys.splice(0, 1);
    var taste_order_list = keys
  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + taste_order_list)
    orderedlist4(facebook_id)
  })

  app.post('/list4',function(req,res){
    var facebook_id = req.body.fb_id
    // var cnslbody = JSON.stringify(req.body, null, 4);
    var keys = Object.keys(req.body)
    keys.splice(0, 1);
    var healthy_order_list = keys
  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + healthy_order_list)
    orderedlist5(facebook_id)
  })
  app.post('/list5',function(req,res){
    var facebook_id = req.body.fb_id
    // var cnslbody = JSON.stringify(req.body, null, 4);
    var keys = Object.keys(req.body)
    keys.splice(0, 1);
    var healthy_order_list = keys
  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + healthy_order_list)
    orderedlist6(facebook_id)
  })
  app.post('/list6',function(req,res){
    var facebook_id = req.body.fb_id
    // var cnslbody = JSON.stringify(req.body, null, 4);
    var keys = Object.keys(req.body)
    keys.splice(0, 1);
    var healthy_order_list = keys
  	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ID: " + req.body.fb_id)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FORM: " + healthy_order_list)
    attitudinal(facebook_id)
  })
  app.post('/products',function(req,res){
    var facebook_id = req.body.fb_id
    var cnslbody = JSON.stringify(req.body, null, 4);
    console.log(cnslbody)
    var list_of_products =  req.body
    compromise(facebook_id, list_of_products)
  })
  app.post('/sugarperson',function(req,res){
    var facebook_id = req.body.fb_id
    var cnslbody = JSON.stringify(req.body, null, 4);
    console.log(cnslbody)
    var sugarperson =  req.body.person
    personality2(facebook_id, sugarperson)
  })
}
