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
    // getDefData(results);
    return console.log(results);
};

// added for the sake of demonstrating functionality; to be removed once functions for generating word array are added
var wordList = ['voluminous', 'aa', 'run']

// function fetches definition data for each in an array of words and returns subset of data packaged as an object
var getDefData = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        let word = arr[i];
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
                    displayWordDefSound(wordDef)
                    // displaySoundBite(wordDef)
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
var displayWordDefSound = function (defObject) {
    console.log(defObject)
    // accessing hard-coded ul element to which DOM elements will be appended
    var resultDivEl = document.querySelector('ul.results-list');

    // check to see whether term is offensive
    if (!defObject.offensive) {
        // create DOM elements
        var resultDiv = document.createElement('div');
        resultDiv.setAttribute('class', 'col s6 m4 l3');

        // display word and class
        var resultItem = document.createElement('li');
        resultItem.innerHTML = '<p><span>' + defObject.word + '</span><br />' + defObject.class + '</p>';

        // loop through each homonym and display within element for that word
        for (var i = 0; i < defObject.definition.length; i++) {
            n = i + 1
            var resultDef = document.createElement('p');
            resultDef.textContent = n + ') ' + defObject.definition[i];
            resultItem.append(resultDef);
        }

        // takes audio file and creates link for audio playback; 'subdir' uses conditions provided by MW api documentation to determine 'subdir' component of resulting href
        var aud = defObject.audio.split('', 3)
        var regex = RegExp('[\\d\\W]')
        var subdir = ''
        if (aud[0] + aud[1] + aud[2] === 'bix') {
            subdir = 'bix'
        } else if (aud[0] + aud[1] === 'gg') {
            subdir = 'gg'
        } else if (regex.test(aud[0])) {
            subdir = 'number'
        } else {
            subdir = aud[0]
        }
        var audioLink = 'https://media.merriam-webster.com/audio/prons/en/us/ogg/' + subdir + '/' + defObject.audio + '.ogg';
        console.log(audioLink)

        // append content to page elements
        resultDiv.append(resultItem);
        resultDivEl.append(resultDiv);

    } else {
        console.log("Sorry, this word cannot be displayed.");
    }

}
