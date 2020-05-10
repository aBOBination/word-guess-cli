var Letter = require('./letters.js');

function Word(word) {
  this.word = word;
  this.letters = word.split('').map(Letter);
  this.wordString = function () {
    wordString = [];
    this.letters.forEach((letter) => {
      wordString.push(letter.displayLetter());
    });
    console.log(wordString.join('  '));
  };
  this.userGuess = function (guess) {
    this.letters.forEach((letter) => {
      letter.userGuess(guess);
    });
  };
  this.checkWon = function () {
    var vals = this.letters.map(function (letter) {
      return letter.letterGuessed;
    });
    if (vals.includes(false)) {
      return false;
    } else {
      return true;
    }
  };
}

// var test = new Word('me r');

// console.log(test.letters);

module.exports = Word;
