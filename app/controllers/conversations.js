module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, 'Welcome, friend')
  })

  // user said hello
  controller.hears(['hello'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hey there.')
  });
  controller.hears(['Q1'], 'message_received', function (bot, message) {
    bot.reply(message, {"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"We know there are heaps of different sugars and sweeteners on the market right now so first we would like to know which ones you’ve heard of. Please click on all the products below that you are aware of:",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://lit-thicket-26597.herokuapp.com/list",
            "title":"Show List",
            "messenger_extensions": true,
            "webview_height_ratio": "compact"
          }
        ]
      }
    }})
  });
  controller.hears(['Q2'], 'message_received', function (bot, message) {
    bot.reply(message, {"attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"There’s a wide variety in terms of what each sugar/sweetener type is made of, how it’s made, etc.  We want to know how you would classify each of these by ranking them where #1 is the most natural down to the most artificial.",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://lit-thicket-26597.herokuapp.com/list2",
            "title":"Rank Sugars",
            "messenger_extensions": true,
            "webview_height_ratio": "compact"
          }
        ]
      }
    }})
  });
  controller.on('message_received', function(bot, incoming) {
      var cnslbody = JSON.stringify(incoming, null, 4);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>LIST: "+ cnslbody)
  });

  controller.hears(['what can I do here?'], 'message_received', function(bot, message) {
      bot.reply(message, "You can talk to me and I will respond!");
  });

  controller.hears(['help'], 'message_received', function(bot, message) {
      bot.reply(message, "type 'hello'");
  });

  controller.hears(['question002'], 'message_received', function(bot, message) {
      bot.reply(message, "got here");
  });
  controller.on('message_received', function(bot, incoming) {
    var id = incoming.user
    if (incoming.attachments){
    } else if(incoming.quick_reply){
      var text = incoming.text
      var payload = incoming.quick_reply.payload
        if (payload === "question002") {
          bot.reply(message, "got here");
        } else if (payload === "feedback"){
          ////
        }
    } else {
      console.log(">>>>>>>>>>NOMETHODFOR: " + incoming)
    }
  });

  // user says anything else
  // controller.hears('(.*)', 'message_received', function (bot, message) {
  //   bot.reply(message, 'you said ' + message.match[1])
  // });
}
