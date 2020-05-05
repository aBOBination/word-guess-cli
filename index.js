// index.js: The file containing the logic for the course of the game,
// which depends on Word.js and:

// Randomly selects a word and uses the Word constructor to store it

// Prompts the user for each guess and keeps track of the user's
// remaining guesses

var Word = require('./word.js');
var inquirer = require('inquirer');

var word = new Word('herp derp');
var guesses = [];
var remainingGuesses = 3;

function validateInput(input) {
  if (
    input !== '' &&
    !guesses.includes(input) &&
    input.length > 1 === false &&
    /^[a-zA-Z]+$/.test(input)
  ) {
    return true;
  }
}

var askQuestion = function () {
  if (remainingGuesses > 0) {
    console.log('Please guess the word!');
    inquirer
      .prompt([
        {
          name: 'guess',
          message: word.wordString(),
          validate: validateInput,
        },
      ])
      .then(function (answers) {
        var guess = answers.guess;
        word.userGuess(guess);
        guesses.push(guess);
        if (!word.word.includes(guess)) {
          remainingGuesses--;
        } else {
          remainingGuesses;
        }
        console.log(remainingGuesses);
        console.log(word.word);
        askQuestion();
      });
  } else {
    console.log('meh');
  }
};

askQuestion();
