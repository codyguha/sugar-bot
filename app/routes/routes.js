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

  app.get('/rank',
    function(req, res){
      res.render('rank', {list: userslist,
        Hrank: "Most Natural",
        Lrank: "Most Artificial",
        description: "There’s a wide variety in terms of what each sugar/sweetener type is made of, how it’s made, etc. We want to know how you would classify each of these by ranking them where #1 is the most natural down to the most artificial.",
        action: "/rank1",
        submit: "submit"
      });
  });

  app.post('/rank1',function(req,res){
    res.render('rank', {list: userslist,
      Hrank: "Tastes Good",
      Lrank: "Tastes Bad",
      description: "Aside from what they’re made of, taste is a big part of why we choose the sugars and sweeteners that we like!  How would you classify each of these in terms of taste?  Please rank them where #1 tastes good down to tastes bad.",
      action: "/rank2",
      submit: "submit"
    });
  })
  app.post('/rank2',function(req,res){
    res.render('rank', {list: userslist,
      Hrank: "Good For you",
      Lrank: "Bad For you",
      description: "Any conversation about sugars and sweeteners includes health considerations.  How would you classify each of these in terms of being healthy?   Please rank where #1 is the most good for you down to those which are not good for you.",
      action: "/rank3",
      submit: "submit"
    });
  })
  app.post('/rank3',function(req,res){
    res.render('rank', {list: userslist,
      Hrank: "Most Common",
      Lrank: "Most Obscure",
      description: "We know you’re aware of these types, but thinking of the market in general, how well known do you think each one is?  Please rank them where #1 is the most common down to the most obscure.",
      action: "/rank4",
      submit: "submit"
    });
  })
  app.post('/rank3',function(req,res){
    res.render('rank', {list: userslist,
      Hrank: "Most Common",
      Lrank: "Most Obscure",
      description: "We know you’re aware of these types, but thinking of the market in general, how well known do you think each one is?  Please rank them where #1 is the most common down to the most obscure.",
      action: "/rank4",
      submit: "submit"
    });
  })
  app.post('/rank4',function(req,res){
    res.render('rank', {list: userslist,
      Hrank: "Most Likely Consider",
      Lrank: "Least Likely Consider",
      description: "Thinking of how likely you would be to consider buying a product containing each of these, please rank them where #1 is the one you would most likely consider down to the one you would least likely consider.",
      action: "/rank5",
      submit: "submit-final"
    });
  })
  app.post('/rank5',function(req,res){
    res.end();
  })
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
