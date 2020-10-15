// Scrabble Word Generator

// page elements

// page variables
var totalLetters = 0;
var dropLetters = [];
var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");
// get user input
spaceEl.textContent = "Drag Letters Here! "
//drag letters
var dragLetters = function(event) {
    event.preventDefault();
    console.log("works")
}

// make letters drag
$(".letter").draggable({ 
    // letterEl.addClass("tileColor"),
     helper: "clone",
     appendTo: ".space",
    //  containment: "#keyboard",
});

//make dropzone
$(".space").droppable({
    accept: ".letter",
    tolerance: "touch",
    drop: function(event, ui) {
        console.log("drop");
        var helper = ui.helper.clone();
        helper.appendTo(".space")
    },
    over: function(event, ui) {
        console.log("over");
    },
    out: function(event, ui) {
        console.log("out");
    }
    // saveTiles();
});
// var saveTiles = function() {

// }
letterEl.addEventListener("click", dragLetters)

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