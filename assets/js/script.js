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
    genarr(totalLetters, letters);
};

// generate all possible combinations of inputted letters
var genarr = function (totalLetters, letters) {
    var results = [];

    var generate = function (possWord) {
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

var wordList = ['voluminous', 'aa', 'dab', 'play']

var getDefData = function (arr) {
    
    // var definition = [];

    for (var w = 0; w < arr.length; w++) {
        var word = arr[w];
        var mwApiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' 
                        + word + '?key=' + smkmw;
        fetch(mwApiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // var definition = (data[0])
                    // var wordDef = {
                    //     word: word,
                    //     definition: definition,
                    // };
                    // console.log(wordDef)
                })
            } else {
                alert("Error:" + response.statusText)
            }
        });
        var wordDef = {
            word: word,
            definition: definition,
        };
        console.log(wordDef);            

    }
    // var wordDef = {
    //     word: word,
    //     definition: definition,
    // };
    // console.log(wordDef);

}
getDefData(wordList)

var formatDef = function (definition) {
    
    // var defs = definition.shortdef
    // for (var d=0; w<defs.length; d++) {

    // }

}

// var displayDef = function(arr) {


// }


