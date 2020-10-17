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
                        class: def.fl,
                        definition: def.shortdef,
                        audio: def.hwi.prs[0].sound.audio,
                        offensive: def.meta.offensive,
                    };
                    // console.log(wordDef)
                    displayWordAndClass(wordDef)
                    displayWordDefinitions(wordDef)
                    displaySoundBite(wordDef)
                    return wordDef
                })
            } else {
                alert("Error:" + response.statusText)
            }
        });
    }
}
getDefData(wordList)

// function takes MW api object data and packages word & class (e.g. noun, verb adjective) for DOM object display
var displayWordAndClass = function (defObject) {
    // accessing hard-coded ul element
    var resultDivEl = document.querySelector('ul.results-list');

    // loop through each word in results array
    for (var i = 0; i < defs.length; i++) {
        // create DOM elements
        var resultDiv = document.createElement('div');
        var resultItem = document.createElement('li');  
        
        // check to see whether term is offensive
        if (!defObject[i].offensive) {
            
            // set display class for containing div
            resultDiv[i].setAttribute('class', 'col s6 m4 l3');
            
            // display word & class
            resultItem[i].textContent = defObject[i].word + ' :' + defObject[i].class;    
            
            // display definitions
            n = i+1
            var defText = n + ') ' + defObject[i].definition;
            console.log(defText)
            resultDiv.append(resultItem);
            resultDivEl.append(resultDiv);
            
        
    }
    } else {
        console.log("I'm sorry this word cannot be displayed.");
    }
}


// function takes MS api object data and creates link for audio playback within DOM object
var displaySoundBite = function (defObject) {
    // 'subdir' is a necessary component of the href; this code determines what its value should be based on instructions from Merriam-Webster
    var aud = defObject.audio.split('', 3)
    var subdir = ''

    if (aud[0] + aud[1] + aud[2] === 'bix') {
        subdir = 'bix'
    } else if (aud[0] + aud[1] === 'gg') {
        subdir = 'gg'
        console.log(aud[0])
    } else if (console.log(/3/.test(/\d\W/))) {
        // (aud[0] === '_' || aud[0] === '.' || aud[0] === '?' || aud[0] === '!' || aud[0] === ',' || aud[0] === ':' ||
        // aud[0] === ';' || aud[0] === '-' || aud[0] === '(' || aud[0] === ')' || aud[0] === '[' || aud[0] === ']' ||
        // aud[0] === '{' || aud[0] === '}' || aud[0] === "'" || aud[0] === '"' || aud[0] === '0' || aud[0] === '1' ||
        // aud[0] === '2' || aud[0] === '3' || aud[0] === '4' || aud[0] === '5' || aud[0] === '6' || aud[0] === '7' ||
        // aud[0] === '8' || aud[0] === '9') 
        subdir = 'number'
    } else {
        subdir = aud[0]
    }

    // check to see whether term is offensive
    if (!defObject.offensive) {
        var audioLink = 'https://media.merriam-webster.com/audio/prons/en/us/ogg/' + subdir + '/' + defObject.audio + '.ogg';
        console.log(audioLink)
        return audioLink
    } else {
        console.log("I'm sorry, this audio cannot be displayed.")
    }

}

