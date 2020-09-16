const PORT = process.env.PORT || 8000;

const http = require('http');
const fs = require('fs')
const url = require('url');
const figlet = require('figlet')
const querystring = require('querystring');
// const express = require("expess")


const server = http.createServer(function(req, res) {
  const params = querystring.parse(url.parse(req.url).query);

  const page = url.parse(req.url).pathname;
  // const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ('choices' in params) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      let player = params['choices'];
      console.log(player)
      // random values
      let random = Math.floor(Math.random() * 5)
      // array containing choices
      //
      let winner;

      let temp = ["spock", "scissor", "rock", "paper", "lizard"];
      let bot = temp[random];
      console.log(bot)
      if (bot === player) {
        winner = "It's a Tie!"
      } else if ((bot === "rock") && (player === "lizard" || player === "scissor")) {
        winner = "You Lose ..."
      } else if ((bot === "scissor") && (player === "lizard" || player === "paper")) {
        winner = "You Lose ..."
      } else if ((bot === "spock") && (player === "scissor" || player === "rock")) {
        winner = "You Lose ..."
      } else if ((bot === "paper") && (player === "spock" || player === "rock")) {
        winner = "You Lose ..."
      } else if ((bot === "lizard") && (player === "spock" || player === "paper")) {
        winner = "You Lose ..."


      } else if ((player === "rock") && (bot === "lizard" || bot === "scissor")) {
        winner = "Winner Winner!"
      } else if ((player === "scissor") && (bot === "lizard" || bot === "paper")) {
        winner = "Winner Winner!"
      } else if ((player === "spock") && (bot === "scissor" || bot === "rock")) {
        winner = "Winner Winner!"
      } else if ((player === "paper") && (bot === "spock" || bot === "rock")) {
        winner = "Winner Winner!"
      } else if ((player === "lizard") && (bot === "spock" || bot === "paper")) {
        winner = "Winner Winner!"

      } else {
        winner = "Carolin "
      }



      const obj = {
        answer: winner
      };


      //rock beats lizard
      //rock beats scissor

      //lizard beats paper
      //lizard beats spock

      //spock beats scissor
      //spock beats rock

      //scissor beats lizard
      //scissor beats paper

      //paper beats rock
      //paper beats spock

      res.end(JSON.stringify(obj));
    }
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(PORT);
