const getRandomIndex = (arrayLength) => {
	return Math.floor(Math.random() * (arrayLength));
};

const getRandomWordFromArray = (array) => {
	const randomIndex = getRandomIndex(array.length);
	const randomWord = array[randomIndex];
	return randomWord;
}