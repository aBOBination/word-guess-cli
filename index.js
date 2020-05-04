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

function validateInpout(input) {
  if (input !== '' && !guesses.includes(input) && input.length > 1 === false && /^[a-zA-Z]+$/.test(input)) {
    return true;
  }
}

var askQuestion = function () {
  // if statement to ensure that our questions are only asked five times
  if (remainingGuesses > 0) {
    console.log('Please guess the word!');
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    inquirer
      .prompt([
        {
          name: 'guess',
          message: word.wordString(),
          validate: validateInpout,
        },
      ])
      .then(function (answers) {
        var guess = answers.guess;
        word.userGuess(guess);
        guesses.push(guess);
        console.log(remainingGuesses);
        askQuestion();
      });
    // else statement which runs a for loop that will execute .printInfo() for each object inside of our array
  } else {
    console.log('meh');
  }
};

// call askQuestion to run our code
askQuestion();
