function start() {

const suits = ["Diamonds", "Spades", "Hearts", "Clubs"];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', "Jack", "Queen", "King", "Ace"]
const scores = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

function create_card(suit, value, score) {
return {
suit: suit,
value: value,
score: score
}
}

function create_deck() {
	var deck = [];
	for (var i = 0; i < 4; i++) {
   		for (var j = 0; j < 13; j++) {
      		deck.push(create_card(suits[i], values[j], scores[j]));
   		}
	}
	for (var i = 0; i < 1000; i++) {
		var x = Math.floor(Math.random() * 52);
		var y = Math.floor(Math.random() * 52);
		var temp = deck[x];
		deck[x] = deck[y];
		deck[y] = temp;
	}
	return deck;
}

const timer = ms => new Promise(res => setTimeout(res, ms));

var deck = create_deck();
var current_score = 0;
var dealer_score = 0;
var button_sound = new Audio("button_sound.mp3");
var card_sound = new Audio("card_flip.mp3");
button_sound.play();
button_sound.currentTime = 0;

async function give_card() {
	card = deck.pop();
	if (!card) return;
	var cardElement = document.createElement('div');
	cardElement.className = 'card';
	cardElement.innerHTML = `${card.suit} : ${card.value}`;
	document.getElementById('back_cards').appendChild(cardElement);
	current_score += parseInt(card.score);
	score_display.innerHTML = `Current score: ${current_score}\nDealer's score: ${dealer_score}`;
	card_sound.play();
	card_sound.currentTime = 0;
	if (current_score > 21)
	{
		document.getElementById('take_card').disabled = true;
		document.getElementById('enough').disabled = true;
		await timer(1000); 
		alert("You lost");
	  	deck = create_deck();
	  	current_score = 0;
	  	score_display.innerHTML = `Current score: ${current_score}\nDealer's score: ${dealer_score}`;
	  	document.getElementById('back_cards').innerHTML = '';
		document.getElementById('take_card').disabled = false;
		document.getElementById('enough').disabled = false;
	}
}

async function enough() {
	document.getElementById('take_card').disabled = true;
	document.getElementById('enough').disabled = true;
	button_sound.play();
	button_sound.currentTime = 0;

	while (dealer_score < 17 || dealer_score <= current_score) {
		await timer(1000);
		card = deck.pop();
		if (!card) return;
		var cardElement = document.createElement('div');
		cardElement.className = 'card';
		cardElement.innerHTML = `${card.suit} : ${card.value}`;
		document.getElementById('dealer_cards').appendChild(cardElement);
		dealer_score += parseInt(card.score);
		score_display.innerHTML = `Current score: ${current_score}\nDealer's score: ${dealer_score}`;
		card_sound.play();
		card_sound.currentTime = 0;
	}
	if (dealer_score > 21) {
		await timer(1000);
		alert("You won!");
		document.getElementById('take_card').disabled = false;
		document.getElementById('enough').disabled = false;
		document.getElementById('back_cards').innerHTML = '';
		document.getElementById('dealer_cards').innerHTML = '';
		deck = create_deck();
		current_score = 0;
		dealer_score = 0;
	  	score_display.innerHTML = `Current score: ${current_score}\nDealer's score: ${dealer_score}`;
	}
	else {
		await timer(1000);
		alert("You lost");
		document.getElementById('take_card').disabled = false;
		document.getElementById('enough').disabled = false;
		document.getElementById('back_cards').innerHTML = '';
		document.getElementById('dealer_cards').innerHTML = '';
		deck = create_deck();
		current_score = 0;
		dealer_score = 0;
	  	score_display.innerHTML = `Current score: ${current_score}\nDealer's score: ${dealer_score}`;
	}
}

document.getElementById("back_cards").style.display = "flex";
document.getElementById("dealer_cards").style.display = "flex";
document.getElementById("start").style.display = "none";
document.getElementById("take_card").style.display = "inline";
document.getElementById("enough").style.display = "inline";

document.getElementById("take_card").onclick = give_card;
document.getElementById("enough").onclick = enough;

var score_display = document.createElement('div');
score_display.className = 'score_display';
score_display.innerHTML = `Current score: ${current_score}\nDealer's score: ${dealer_score}`;
document.getElementById('back_buttons').appendChild(score_display);
}


