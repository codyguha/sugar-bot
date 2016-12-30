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
  controller.on('message_received', function(bot, incoming) {

      console.log(">>>>>>>>>>>>>>>>>>>>>>>LIST: "+ incoming)
  });

  controller.hears(['what can I do here?'], 'message_received', function(bot, message) {
      bot.reply(message, "You can talk to me and I will respond!");
  });

  controller.hears(['help'], 'message_received', function(bot, message) {
      bot.reply(message, "type 'hello'");
  });

  // user says anything else
  // controller.hears('(.*)', 'message_received', function (bot, message) {
  //   bot.reply(message, 'you said ' + message.match[1])
  // });
}
