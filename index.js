var Word = require('./word.js');
var inquirer = require('inquirer');
var words = [
  'jean-luc picard',
  'william riker',
  'geordi ja forge',
  'tasha yar',
  'worf',
  'beverly crusher',
  'deanna troi',
  'data',
  'wesley crusher',
  'q',
  'hugh',
  'guinan',
  'reginald barclay',
  "miles o'brien",
  'noonian soong',
];

var word = new Word(randomWord());
console.log(randomWord());
var guesses = [];
var remainingGuesses = 3;

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function playAgain() {
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
        word = new Word(randomWord());
        guesses = [];
        remainingGuesses = 3;
        askQuestion();
      } else {
        console.log('Bye Felicia!');
      }
    });
}

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
          playAgain();
        } else {
          askQuestion();
        }
      });
  } else {
    playAgain();
  }
};

askQuestion();
