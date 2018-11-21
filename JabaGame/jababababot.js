//server code
const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "607223777:AAEz8mJFpZtuquRFCYmc-SbtyXwKqtWX1lU";
const server = express();
const bot = new TelegramBot(TOKEN, { polling: true } );
const port = process.env.PORT || 5000;
const gameName = process.env.jaba || 'jaba';
const queries = {};
const url = 'https://superpro49.github.io/jaba/JabaGame/';
const app = express();
console.log("started");

server.use(express.static(path.join(__dirname, 'public')));

// Basic configurations
app.set('view engine', 'ejs');

// Tunnel to localhost.
// This is just for demo purposes.
// In your application, you will be using a static URL, probably that
// you paid for. :)
if (url === '0') {
  const ngrok = require('ngrok');
  ngrok.connect(port, function onConnect(error, u) {
    if (error) throw error;
    url = u;
    console.log(`Game tunneled at ${url}`);
  });
}

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, url, true, { url });
});

// Render the HTML game
app.get('/', function requestListener(req, res) {
  res.sendFile(path.join(__dirname, 'game.html'));
});

// Bind server to port
app.listen(port, function listen() {
  console.log(`Server is listening at http://localhost:${port}`);
});


bot.onText(/\/link (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendDocument(chatId, resp);
});

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "fuck"));

// bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));

// bot.on("callback_query", function (query) {
//     if (query.game_short_name !== gameName) {
//       bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
//     } else {
//       queries[query.id] = query;
//       let gameurl = "https://noirvortex.co.uk/assholehunter/Prozbot1.html?  id="+query.id;
//       bot.answerCallbackQuery({
//         callback_query_id: query.id,
//         url: gameurl
//       });
//       console.log(gameurl);
//     }
//   });

//   bot.on("inline_query", function(iq) {
//     bot.answerInlineQuery(iq.id, [ { type: "game", id: "0", game_short_name: gameName } ] );
//   });

    // bot.onText( /\/play (.+)/, function( msg, match ) {

    //     switch( match[1] ) {
      
    //         case "assholehunter":
      
    //             bot.sendGame(
      
    //                 fromId,
      
    //                 "assholehunter",
      
    //                 {
      
    //                     reply_markup: JSON.stringify({
      
    //                         inline_keyboard: [
      
    //                             [ { text: "Play", callback_game: JSON.stringify( { game_short_name: "assholehunter" } ) } ],
      
    //                             [ { text: "Share", url: "https://telegram.me/prozbotskiBot" } ]
      
    //                         ]
      
    //                     })
      
    //                 }
      
    //             );
      
    //             break;
      
    //         default:
      
    //             bot.sendMessage( fromId, "Sorry " + msg.from.first_name + ", but this game doesn’t exist.." );
      
    //     }
      
    // //   } );
    // server.listen(port);  
