// Scrabble Word Generator

// page elements

// page variables
var totalLetters = 0;

// get user input
// by drag and drop object

// by user form
function getInputValue() {
    var letters = document.getElementById('possible-letters').value;
    console.log(letters);
    // get total letter count
    letterCounter(letters);

    function letterCounter(letters) {
        // reset variable
        totalLetters = 0;
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ar = alphabet.split("");
        for (var i = 0; i < letters.length; i++) {
            if (ar.indexOf(letters[i]) > -1) {
                totalLetters = totalLetters + 1;
            }
        }
        return totalLetters;
    }
    console.log(totalLetters);
    // call word generator
    genWordlist(totalLetters, letters);
};

// generate all possible combinations of inputted letters
var genWordlist = function(totalLetters, letters) {
    var results = [];

    var generate = function(possWord) {
        for (var i = 0; i < letters.length; i++) {
        possWord += letters[i];
        if (possWord.length === totalLetters) {
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
    return console.log(results);
};

var getDef = function(wordList) {
    
    var mwApiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=';

    fetch(mwApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
            })
        } else {
            alert("Error:" + response.statusText)
        }
    });
    
    // for (var w=0; w<wordList.length; w++) {

    // }
}
