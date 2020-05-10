function Letter(letter) {
  var l = new Object();
  l.letter = letter.toString();
  l.letterGuessed = /^[^a-zA-Z]+$/.test(l.letter) ? true : false;
  l.displayLetter = function () {
    return l.letterGuessed ? l.letter : '_';
  };
  l.userGuess = function (guess) {
    l.letterGuessed = guess === l.letter ? true : l.letterGuessed;
  };
  return l;
}

module.exports = Letter;
