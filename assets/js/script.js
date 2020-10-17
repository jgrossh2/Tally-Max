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

// added for the sake of demonstrating functionality; to be removed once functions for generating word array are added
var wordList = ['voluminous', 'aa', 'dab', 'play']

// function fetches definition data for each in an array of words and returns subset of data packaged as an object
var getDefData = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        var word = arr[i];
        var mwApiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
            + arr[i] + '?key=' + smkmw;
        fetch(mwApiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var def = (data[0])
                    var wordDef = {
                        word: word,
                        function: def.fl,
                        definition: def.shortdef,
                        audio: def.hwi.prs[0].sound.audio,
                        offensive: def.meta.offensive,  
                    };
                    console.log(wordDef)
                    formatDef(wordDef)
                    soundBite(wordDef)
                    return wordDef
                })
            } else {
                alert("Error:" + response.statusText)
            }
        });
    }
}
getDefData(wordList)


