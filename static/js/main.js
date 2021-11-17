const words = {
	"Place": [
		"Pequea",
		"New York",
		"Lancaster",
		"Conestoga"
	],
	"Name": [
		"Sean",
		"Greg",
		"Judy",
		"Winston Churchill"
	],
	"Animal": [
		"dog",
		"cat",
		"cow",
		"elephant",
		"horse",
		"donkey"
	]
};

let guesses = [];
let word = '';
let gameover = false;
let misses = 0;
let matches = 0;

const guessWordInput = document.getElementById('guessWord');
const guessWordBtn = document.getElementById('guessWordBtn');
const resetBtn = document.getElementById('resetBtn');
const categorySpan = document.getElementById('category');
const msgDiv = document.getElementById('message');
const wordDiv = document.getElementById('word');
const guessesDiv = document.getElementById('guesses');

const generatePlaceholders = () => {
	const blank = document.createElement('div');
	blank.style.display = 'inline-block';
	blank.style.width = '20px';
	blank.style.height = '20px';
	blank.style.marginRight = '10px';

	wordDiv.innerHTML = '';

	//['s','e','a','n']
	Array.from(word).forEach((letter, i) => {
		const placeHolder = blank.cloneNode(true);
		if (letter !== ' ') {
			placeHolder.style.borderBottom = '2px solid black';
			placeHolder.className = 'placeholder'
		}
		placeHolder.id = `letter-${i}`;
		placeHolder.dataset.letter = letter;
		wordDiv.appendChild(placeHolder);
	});
}

const getWord = () => {
	const categories = Object.keys(words);
	const category = getRandomWordFromArray(categories);

	// update display with chosen category
	categorySpan.innerHTML = category;

	word = getRandomWordFromArray(words[category]);

	generatePlaceholders();
};

const revealWord = () => {
	const placeHolders = document.getElementsByClassName('placeholder');
	Array.from(placeHolders).forEach((placeholder) => {
		// const letter = placeholder.dataset.letter;
		// placeholder.innerHTML = letter;
		placeholder.innerText = placeholder.dataset.letter;
	});
}

const endGameCheck = (guessWord = '') => {
	if (word.replaceAll(' ', '').length === matches || word.toLowerCase() === guessWord.toLowerCase()) { // win
		setSuccessMessage('You Win!')
		gameover = true;
	} else if (guessWord !== '') {
		executeMiss();
	}

	if (!gameover && misses >= 6) { // lose
		setErrorMessage('You Lose! Game Over')
		gameover = true;
	}

	if (gameover) {
		resetBtn.hidden = false;
		guessWordInput.hidden = true;
		guessWordBtn.hidden = true;
		revealWord();
	}
};

const executeMiss = () => {
	misses++;
	const bodyPart = document.getElementById(`bodyPart-${misses}`);
	bodyPart.hidden = false;
	setErrorMessage(`${misses} Miss${(misses > 1) ? 'es' : ''}`);
}

const resetGame = () => {
	guesses = [];
	word = '';
	gameover = false;
	misses = 0;
	matches = 0;
	getWord();
	setMessage('New Game');
	guessWordInput.hidden = false;
	guessWordBtn.hidden = false;
	displayGuesses();

	const bodyParts = document.getElementsByClassName('bodyPart');
	Array.from(bodyParts).forEach((bodyPart) => {
		bodyPart.hidden = true
	});
	resetBtn.hidden = true;
	guessWordInput.blur();
}

const displayGuesses = () => {
	guessesDiv.innerText = guesses.map(letter => letter.toUpperCase()).sort().join(" ");
}

resetBtn.onclick = () => {
	resetGame();
};		

// guessBtn.onclick = () => {
document.addEventListener('keydown', (event) => {
	if (gameover || guessWordInput === document.activeElement || event.keyCode < 65 || event.keyCode > 90) {
		return;
	}

	let guessValue = event.key.toLowerCase();
	// guessValue = guessValue.toLowerCase();

	// check if letter has been guessed
	if (guesses.includes(guessValue)) {
		setMessage(`Letter ${guessValue} has already been guessed`);
	} else {
		guesses.push(guessValue);
		displayGuesses();

		// check if letter is in the word
		if (word.toLowerCase().includes(guessValue)) {
			// something good
			Array.from(word).forEach((letter, i) => {
				if (guessValue === letter.toLowerCase()) {
					const placeHolder = document.getElementById(`letter-${i}`);
					placeHolder.innerText = letter;
					matches++;
				}
			});
			setSuccessMessage('Match Found!')
			endGameCheck();
		} else {
			executeMiss();
			endGameCheck();
		}
	}
});

guessWordBtn.onclick = () => {
	const guessWord = guessWordInput.value;
	guessWordInput.value = '';
	endGameCheck(guessWord);
};