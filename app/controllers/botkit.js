var Botkit = require('botkit'),
  mongoStorage = require('botkit-storage-mongo')({mongoUri: process.env.MONGODB_URI}),
  controller = Botkit.facebookbot({
    debug: true,
    access_token: process.env.page_token,
    verify_token: process.env.verify_token,
    storage: mongoStorage,
  });

var bot = controller.spawn({})

// SETUP
require('./facebook_setup')(controller)

// Conversation logic
require('./conversations')(controller)

// this function processes the POST request to the webhook
var handler = function (obj) {
  controller.debug('Message received from FB')
  var message
  if (obj.entry) {
    for (var e = 0; e < obj.entry.length; e++) {
      for (var m = 0; m < obj.entry[e].messaging.length; m++) {
        var facebook_message = obj.entry[e].messaging[m]

        console.log(facebook_message)

        // normal message
        if (facebook_message.message) {
          if (facebook_message.message.quick_reply){
            message = {
              text: facebook_message.message.text,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
              seq: facebook_message.message.seq,
              mid: facebook_message.message.mid,
              attachments: facebook_message.message.attachments,
              payload: facebook_message.message.quick_reply.payload
            }

            // save if user comes from m.me adress or Facebook search
            // create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)

            controller.receiveMessage(bot, message)
          } else {
            message = {
              text: facebook_message.message.text,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
              seq: facebook_message.message.seq,
              mid: facebook_message.message.mid,
              attachments: facebook_message.message.attachments,
            }

            // save if user comes from m.me adress or Facebook search
            // create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)

            controller.receiveMessage(bot, message)
          }

        }
        // When a user clicks on "Send to Messenger"
        else if (facebook_message.optin ||
                (facebook_message.postback && facebook_message.postback.payload === 'optin')) {
          message = {
            optin: facebook_message.optin,
            user: facebook_message.sender.id,
            channel: facebook_message.sender.id,
            timestamp: facebook_message.timestamp
          }

            // save if user comes from "Send to Messenger"
          create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)

          controller.trigger('facebook_optin', [bot, message])
        }
        // clicks on a postback action in an attachment
        else if (facebook_message.postback) {
          // trigger BOTH a facebook_postback event
          // and a normal message received event.
          // this allows developers to receive postbacks as part of a conversation.
          message = {
            payload: facebook_message.postback.payload,
            user: facebook_message.sender.id,
            channel: facebook_message.sender.id,
            timestamp: facebook_message.timestamp
          }

          controller.trigger('facebook_postback', [bot, message])

          message = {
            text: facebook_message.postback.payload,
            user: facebook_message.sender.id,
            channel: facebook_message.sender.id,
            timestamp: facebook_message.timestamp
          }

          controller.receiveMessage(bot, message)
        }
        // message delivered callback
        else if (facebook_message.delivery) {
          message = {
            optin: facebook_message.delivery,
            user: facebook_message.sender.id,
            channel: facebook_message.sender.id,
            timestamp: facebook_message.timestamp
          }

          controller.trigger('message_delivered', [bot, message])
        }
        else {
          controller.log('Got an unexpected message from Facebook: ', facebook_message)
        }
      }
    }
  }
}

var create_user_if_new = function (id, ts) {
  controller.storage.users.get(id, function (err, user) {
    if (err) {
      console.log(err)
    }
    else if (!user) {
      controller.storage.users.save({id: id, created_at: ts})
    }
  })
}

controller.on('tick', function(bot, event) { });

var broadcast = function (id, list) {
  var user_data = {id: id, list: list};
  controller.storage.users.save(user_data);
  bot.say({
      text: `I bet you didn’t know there were so many types of sweeteners did you! Now tell us about which of these statements best describes how you feel about the ones you are aware of. Starting with... `+ list[0],
      channel: id,
      quick_replies: [
          {
              "content_type": "text",
              "title": "Only type I consume",
              "payload": "question002",
          },
          {
              "content_type": "text",
              "title": "Preferred type",
              "payload": "question002",
          },
          {
              "content_type": "text",
              "title": "Consume,prefer other",
              "payload": "question002",
          },
          {
              "content_type": "text",
              "title": "I’ve tried it",
              "payload": "question002",
          },
          {
              "content_type": "text",
              "title": "Don't know much",
              "payload": "question002",
          }
      ]
  });
}
var orderedlist3 = function (id) {
  bot.say({
      channel: id,
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Aside from what they’re made of, taste is a big part of why we choose the sugars and sweeteners that we like!  How would you classify each of these in terms of taste?  Please rank them where #1 tastes good down to tastes bad.",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://lit-thicket-26597.herokuapp.com/list3",
              "title":"Rank Sugars",
              "messenger_extensions": true,
              "webview_height_ratio": "compact"
            }
          ]
        }
      }
  });
}
var orderedlist4 = function (id) {
  bot.say({
      channel: id,
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Any conversation about sugars and sweeteners includes health considerations.  How would you classify each of these in terms of being healthy?   Please rank where #1 is the most good for you down to those which are not good for you.",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://lit-thicket-26597.herokuapp.com/list4",
              "title":"Rank Sugars",
              "messenger_extensions": true,
              "webview_height_ratio": "compact"
            }
          ]
        }
      }
  });
}
var orderedlist5 = function (id) {
  bot.say({
      channel: id,
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"We know you’re aware of these types, but thinking of the market in general, how well known do you think each one is?  Please rank them where #1 is the most common down to the most obscure.",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://lit-thicket-26597.herokuapp.com/list5",
              "title":"Rank Sugars",
              "messenger_extensions": true,
              "webview_height_ratio": "compact"
            }
          ]
        }
      }
  });
}
var orderedlist6 = function (id) {
  bot.say({
      channel: id,
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Thinking of how likely you would be to consider buying a product containing each of these, please rank them where #1 is the one you would most likely consider down to the one you would least likely consider.",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://lit-thicket-26597.herokuapp.com/list6",
              "title":"Rank Sugars",
              "messenger_extensions": true,
              "webview_height_ratio": "compact"
            }
          ]
        }
      }
  });
}
var attitudinal = function (id) {
  bot.say({
      text: `How strongly do you agree with the following statements about sugars and sweeteners? 'I think that natural sugars are better for me than artificial sweeteners'`,
      channel: id,
      quick_replies: [
          {
              "content_type": "text",
              "title": "Strongly agree",
              "payload": "question008",
          },
          {
              "content_type": "text",
              "title": "Somewhat agree",
              "payload": "question008",
          },
          {
              "content_type": "text",
              "title": "Neither",
              "payload": "question008",
          },
          {
              "content_type": "text",
              "title": "Somewhat disagree",
              "payload": "question008",
          },
          {
              "content_type": "text",
              "title": "Strongly disagree",
              "payload": "question008",
          }
      ]
  });
}
var compromise = function (id , list) {
  controller.storage.users.save({id: id, would_buy: list});
  var user_data = controller.storage.users.get(id);
  if (user_data.pre)

  bot.say({
      text: `We know that you prefer to consume natural sugars, but life gets hectic and there are certain times and situations where it may be more difficult to stick to your preference.`,
      channel: id
  });
  comprimise2(id);
}
var compromise2 = function (id) {
  bot.say({
      text: `Imagine yourself in some of these situations – whether it’s under a time crunch, certain locations, the people you are with, etc. -- and think of when you would compromise and consume artificial sweeteners.`,
      channel: id,
      quick_replies: [
          {
              "content_type": "text",
              "title": "Not Now",
              "payload": "compromise",
          },
          {
              "content_type": "text",
              "title": "Get Started",
              "payload": "compromise",
          }
      ]
  });
}


exports.handler = handler
exports.broadcast = broadcast
exports.orderedlist3 = orderedlist3
exports.orderedlist4 = orderedlist4
exports.orderedlist5 = orderedlist5
exports.orderedlist6 = orderedlist6
exports.attitudinal = attitudinal
exports.compromise = compromise
