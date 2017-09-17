// jQuery for fadeIn
// $(function () {
//   console.log('JSLinked!');

//   $('body').css('display', 'none');
//   $('body').fadeIn(2000);

// });
// end jQuery

var suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var deck = [];
var players = [];
var currentPlayer = 0;

// creating divs for each player
function makePlayerDivs() {
  document.getElementById('players').textContent = '';
  for (var i = 0; i < players.length; i++) {
    var playerName = document.createElement('div');
    var playerId = document.createElement('div');
    var playersHand = document.createElement('div');
    var playerPoints = document.createElement('div');
    // var suits = document.createElement('img');

    playerPoints.className = 'points';
    playerPoints.id = 'pointsId' + i;
    playerName.id = 'playerId' + i;
    playerName.className = 'player';
    playersHand.id = 'handId' + i;

    playerId.textContent = players[i].Id;
    playerName.appendChild(playerId);
    playerName.appendChild(playersHand);
    playerName.appendChild(playerPoints);
    playerName.setAttribute('player', i);

    //appends attributes to the players variable;
    document.getElementById('players').appendChild(playerName);
  }
};

// create player obj to be referenced;
function createPlayers(num) {
  players = [];
  for (var i = 1; i <= num; i++) {
    var hand = [];
    var player = {
      Name: 'Player ' + i,
      Id: 'Player ' + i,
      Points: 0,
      Hand: hand,
      // Money: 1000
    };
    players.push(player);
  }
};

// set values for each suit and number;
// set Ace logic so that Ace can be counted as 1 or 11;
function createDeck() {
  deck = [];
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < suits.length; j++) {
      var cardValue = Number(values[i]);
      if (values[i] === 'J' || values[i] === 'Q' || values[i] === 'K') {
        cardValue = Number(10);
      } else if (values[i] === 'A') {
        cardValue = Number(11);
      }
      var card = {
        Value: values[i],
        Suit: suits[j],
        CardValue: cardValue
      };
      deck.push(card);
    }
  }
};

// randomly select cards out of 1500;
// cuts the deck & Shuffle cards;
function randomCards() {
  for (var i = 0; i < 1500; i++) {
    var cutHalf = Math.floor((Math.random() * deck.length));
    var cutSecondHalf = Math.floor((Math.random() * deck.length));
    var cutDeck = deck[cutHalf];
    deck[cutHalf] = deck[cutSecondHalf];
    deck[cutSecondHalf] = cutDeck;
  }
};

// deal 2 cards to every player object
function dealCards() {
  currentPlayer = 0;
  createDeck();
  randomCards();
  createPlayers(2);
  makePlayerDivs();
  dealHands();

  document.getElementById('playerId' + currentPlayer).classList.add('active');
};

// alternate handing cards to each player
function dealHands() {
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < players.length; j++) {
      var card = deck.pop();
      players[j].Hand.push(card);

      printCard(card, j);
      printCardTotal();
    }
  }
  cardsLeft();
};

// prints the card to the board
function printCard(card, player) {
  var hand = document.getElementById('handId' + player);
  hand.appendChild(getCardValue(card));
};

//gets the suit of the card;
function getCardValue(card) {
  var el = document.createElement('div');
  el.className = 'card';
  el.textContent = card.Suit + ' ' + card.Value;

  return el;
};

// check if current player new points are over 21
// mimics if a player 'hits';
function nextCard() {
  var card = deck.pop();
  players[currentPlayer].Hand.push(card);

  printCard(card, currentPlayer);
  printCardTotal();
  cardsLeft();
  losingHand();
};

// move on to next player
function stay() {
  if (currentPlayer != players.length - 1) {
    document.getElementById('playerId' + currentPlayer).classList.remove('active');
    currentPlayer += 1;
    document.getElementById('playerId' + currentPlayer).classList.add('active');
  } else {
    document.getElementById('playerId' + currentPlayer).classList.remove('active');
    winningHand();
  }
};

// winning message
function winningHand() {
  var score = 0;
  for (var i = 0; i < players.length; i++) {
    if (players[i].Points > score && players[i].Points < 21) {
      winner = i;
    } else if (players[currentPlayer].Points === score) {
      document.getElementById('condition').textContent = ('PUSH!');
      return score;
    }
    score = players[i].Points;
  }
  document.getElementById('condition').textContent = (players[winner].Id + ' WINS!');
};

// Losing hand and tie
function losingHand() {
  if (players[currentPlayer].Points > 21) {
    document.getElementById('condition').textContent = (players[currentPlayer].Id + ' LOST!');
  }
};

// updates the amount of cards left in the deck
// prints the amount of cards left in the deck of 52;
function cardsLeft() {
  document.getElementById('deckcount').textContent = deck.length;
};

// returns the total of card values that a player has in hand
function totalValue(player) {
  var bool = false
  var points = 0;
  for (var i = 0; i < players[player].Hand.length; i++) {
    points += players[player].Hand[i].CardValue;
    if (players[player].Hand[i].Value === 'A') {
      bool = true;
    }
  }
  if (bool === true) {
    if (points > 21) points = points - 10
  }
  players[player].Points = points;
  return points;
};

// prints card total
function printCardTotal() {
  for (var i = 0; i < players.length; i++) {
    totalValue(i);
    document.getElementById('pointsId' + i).textContent = 'Total: ' + players[i].Points;
  }
};

// initiates all functions
function init() {
  createDeck();
  randomCards();
  createPlayers(1);
};

init();