// Scrabble Word Generator

// page elements
var twoLetterBtnEl = document.getElementById('twoLetterBtn');
var threeLetterBtnEl = document.getElementById('threeLetterBtn');
var randomLetterBtnEl = document.getElementById('randomLetterBtn');
var letterContainerEl = document.getElementById('possible-letters');

// global page variables
var wordLength = 0;

// event listeners to gather user input and start generator function
twoLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 2;
    // call word generator
    genWordlist(wordLength, letters);
});

threeLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 3;
    // call word generator
    genWordlist(wordLength, letters);
});

randomLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;

    // get total letter count
    letterCounter(letters);
    function letterCounter(letters) {
        // reset global variable
        wordLength = 0;   
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ar = alphabet.split("");
        for (var i = 0; i < letters.length; i++) {
            if (ar.indexOf(letters[i]) > -1) {
                wordLength = wordLength + 1;
            }
        }
        return wordLength;
    }
    // call word generator
    genWordlist(wordLength, letters);
});

// generate all possible combinations of inputted letters
var genWordlist = function(wordLength, letters) {
    // reset form container
    letterContainerEl.value = '';
    var results = [];

    var generate = function(possWord) {
        for (var i = 0; i < letters.length; i++) {
        possWord += letters[i];
        if (possWord.length === wordLength) {
            if (dict.includes(possWord)) {
                results.push(possWord);
            }
        } else {
            generate(possWord);
        }
        possWord = possWord.slice(0, -1);
        }
    }
    generate("");

    // store user search / results
    localStorage.setItem(letters, results);

    return console.log(results);
};
