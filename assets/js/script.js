// Scrabble Word Generator

// page elements

// page variables
var totalLetters = 0;
var dictionary = [];

// fetch('/assets/dict/dict.txt').then(response => response.text()).then(data => { console.log(data)});
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
                results.push(possWord);
            } else {
                generate(possWord);
            }
            possWord = possWord.slice(0, -1);
        }
    }
    generate("")
    return console.log(results);
};
//function that displays the words that are generated



var wordDisplay = function () { //posWord or word you get form the dictionary?)

    var word = document.querySelectore("wordEl").value;
    var list = [];
    localStorage.setItem("list", JSON.stringify(list));

    var listOfWords = document.createElement("li");
    //listofWords.classList.add("word generated")
    var string = word;

    listOfWords.textContent = string;

    wordsGenerated.onclick = function () {
        //    if ( )
        //};

        wordsGenerated.appendChild(listOfWords);

        wordEl.setAttribute("class-name")

        wordDefinition();
        //placeholder
    }

    //words generating as a <li> w/ word on the left and on the right 2 clickable icons -1 to display the definition and 1 to display whatever else we choose

    //fetch => the display of the object word
    // var wordDefinition = function (word) {
    //     console.log("icon");

    //     var word = document.quesrySelector("#id").value;
    //     //fetch
        // fetch(
        //     "http://api"
        //         .then(function (response) ) {
        //     console.log(response);
        //     return response.json();

        // })
        //     .then(function (data) {
        //         console.log(data);

        //         el.setAttribute('src', "http:// " + data.list[i].el //'class-name');

        //body.classList.add("card") if created in JS
        //body.appendChild(body);
    // })
    //     wordDefinition('');
  //  );
    //API token is: b215d9b947a47ebd06cee1f48819e44474eeff9f
    //curl --header "Authorization: Token b215d9b947a47ebd06cee1f48819e44474eeff9f" https://owlbot.info/api/v4/dictionary/owl -s | json_pp