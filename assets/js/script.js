// Scrabble Word Generator
// page elements
var resultsEl = document.getElementById("results-container");
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
var genWordlist = function (totalLetters, letters) {
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
    displayResults(results)
    return results
};


// When the user clicks on a button generate a list of words and then put them on the page
// when i click on the generate button
// call a function called generate
// itterate through list of words to see if mine exists


//create function to show words in the list
var displayResults = function (results) {
    //check if there are any results
    if (results === 0) {
        resultsEl.textContent = "No Results Found";
    } else {
        //totalLetters.textContent = document.getElementById("results").setAttribute("button", "onclick", results);
        var just_five = [];
        //create for loop to show 5 RANDOM words from the array
        for (var i = 0; i < results.length; i++) {
            just_five.push(results[i])
            var wordDiv = document.createElement("button")
            wordDiv.textContent = results[i]
            resultsEl.appendChild(wordDiv)
        }

        showDescription(just_five);
        //showImage();
        //showImage(just_five);
    }
}

var showDescription = function (word_array) {

    word_array.forEach(word => {
        //posWord or word you get form the dictionary
        var apiUrl = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=9197f1fd-982d-40cb-b0ef-a4e64d1afabb";
        //make a get request for url
        fetch(apiUrl)
            .then(function (response) {
                //request was sucessful
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                    });

                } else {
                    return
                }
            });
    })
}

//cleate button function for modal Picture display(next step will be :get picAPI to display inside)
document.getElementById("images").addEventListener("click", showImage);
var showImage = function () {
    document.getElementById("images").innerHTML = "Image";
}


