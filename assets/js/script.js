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

// function takes word object data and prepares for DOM object display
var formatDef = function (defObject) {
    var defs = defObject.definition
    for (var i=0; i<defs.length; i++) {
        console.log(defs[i])
    }
}

//function takes filename for audio playback from word object data and creates link for audio playback
var soundBite = function (defObject) {

    var audio = defObject.audio
    for (var i=0; i<audio)

// if audio begins with "bix", the subdirectory should be "bix",
// if audio begins with "gg", the subdirectory should be "gg",
// if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
// otherwise, the subdirectory is equal to the first letter of audio.

    audioLink = 'https://media.merriam-webster.com/audio/prons/en/us/ogg/' + [subdirectory] + '/' + defObject.audio + '.ogg;
}