module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, 'Welcome, friend')
  })

  // user said hello
  controller.hears(['hello'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hey there.')
  })

  // user says anything else
  controller.hears('(.*)', 'message_received', function (bot, message) {
    bot.reply(message, 'you said ' + message.match[1])
  })
  function broadcastIt(){
    bot.say(
    {
        text: 'my message_text',
        channel: '1246026675468456'
    }
  );
  }
}
