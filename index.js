var Word = require('./word.js');
var inquirer = require('inquirer');

var word = new Word('herp derp');
var guesses = [];
var remainingGuesses = 3;
var guessed = false;

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
    console.log('Guess the word!');
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
        if (word.checkWon() === true) {
          console.log('You win!');
          word.wordString();
        } else {
          askQuestion();
        }
      });
  } else {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'replay',
          message: 'Play again?',
        },
      ])
      .then(function (answers) {
        if (answers.replay === true) {
          word = new Word('next word');
          guesses = [];
          remainingGuesses = 3;
          askQuestion();
        } else {
          console.log('Bye Felicia!');
        }
      });
  }
};

askQuestion();
