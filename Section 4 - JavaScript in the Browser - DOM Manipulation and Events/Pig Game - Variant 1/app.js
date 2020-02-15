/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his ENTIRE score when he rolls two 6 in  a row. After that, it's the next player's turn.
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

// Initialize game
function init() {
	score = [0, 0];
	lastDice = 0;
	roundScore = 0;
	activePlayer = 1;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-1').textContent = '0';
	document.getElementById('score-2').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('current-2').textContent = '0';
	document.getElementById('name-1').textContent = 'Player 1';
	document.getElementById('name-2').textContent = 'Player 2';
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-2-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-2-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.add('active');
}

// Make the next player's turn
function nextPlayer() {
	// Next player
	activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
	roundScore = 0;

	document.getElementById('current-1').textContent = '0';
	document.getElementById('current-2').textContent = '0';

	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.player-2-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

// Add event listener to 'ROLL DICE' button
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// 1. Random Number
		var dice = Math.floor(Math.random() * 6) + 1

		// 2. Display the result
		var diceDOM = document.querySelector('.dice')
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// 3. Update the round score IF the rolled number is NOT a 1
		if (dice === 6 && lastDice === 6) {
			// Player looses score
			score[activePlayer - 1] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			nextPlayer();
		} else if (dice !== 1) {
			// Add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}
		lastDice = dice;
	}
});

// Add event listener to 'HOLD' button
document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		score[activePlayer - 1] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer - 1];

		// Check if player won the game
		if (score[activePlayer - 1] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

// Add event listener to 'NEW GAME' button
document.querySelector('.btn-new').addEventListener('click', init);

