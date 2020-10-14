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

// When the user clicks on a button generate a list of worsa and then put them on the page
// when i click on the generate button
// calla function called generate
// itterate through list of words to see if mine exists


//create function to show words in the list
var displayResults = function (results) {//posswords?letters, totalLetters
    //check if there are any results
    if (results === 0) {
        resultsEl.textContent = "No Results Found";
    } else {
        //totalLetters.textContent = document.getElementById("results").setAttribute("button", "onclick", results);
        let just_five = [];
        //create for loop to show 5 RANDOM words from the array
        for (var i = 0; i < results.length; i++) {
            just_five.push(results[i])
            let wordDiv = document.createElement("button")
            wordDiv.textContent = results[i]
            resultsEl.appendChild(wordDiv)
        }

        description(just_five)
    }
}

var description = function (word_array) {

    word_array.forEach(word => {
        //posWord or word you get form the dictionary
        var apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=9197f1fd-982d-40cb-b0ef-a4e64d1afabb`;
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

//for each word create a corresponding BUTTON with a info-ICON -API
//and with IMAGE corresponding to the meaning of that word -API
//function for the meaning of the word?

// PEXEL key:563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf
//API photo:https://api.pexels.com/v1
//API video: https://api.pexels.com/videos


//wordEl.setAttribute("class-name")
    //
   // wordDefinition();
    //placeholder
//}
////////////////////
//words generating as a <li> w/ word on the left and on the right 2 clickable icons -1 to display the definition and 1 to display whatever else we choose

//fetch => the display of the object word
// var wordDefinition = function (word) {
//     console.log("icon");

//     var word = document.quesrySelector("#id").value;
//     //fetch
//     fetch(
//         "http://api"
//             .then(function (response) {
//                 console.log(response);
//                 return response.json();

//             })
//             .then(function (data) {
//                 console.log(data);
//                 el.setAttribute('src', "http:// " + data.list[i].el //'class-name');

//         body.classList.add("card")// if created in JS
//         body.appendChild(body);
//                 //})
//                 wordDefinition('');
//             });
//API token is: b215d9b947a47ebd06cee1f48819e44474eeff9f
//curl--header "Authorization: Token b215d9b947a47ebd06cee1f48819e44474eeff9f" https://owlbot.info/api/v4/dictionary/owl -s | json_pp