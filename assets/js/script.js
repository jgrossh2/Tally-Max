// Scrabble Word Generator

// page elements

// page variables
var totalLetters = 0;
var dropLetters = [];
var letters = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
var letterEl = document.querySelector(".letter");

// get user input
//drag letters
var dragLetters = function(event) {
    event.preventDefault();
    console.log("works")
}
//give letters data value 
// var letterValue = function() {
//     for (var i = 0; i < letters.length; i++){
//         var letterBtn = $("<button>");
//         letterBtn.attr("letters", letters[i]);
//         letterBtn.addClass("submit");
//         letterBtn.text(letters[i]);
//         console.log("hello");
//     };
// }
// by drag and drop object
$(".letter").draggable({ 
    helper: "clone",
});

$(".space").droppable({
    accept: ".button",
    tolerance: "touch",
    drop: function(event, ui) {
        console.log("drop");
    },
    over: function(event, ui) {
        console.log("over");
    },
    out: function(event, ui) {
        console.log("out");
    }

});

// letterValue();
letterEl.addEventListener("click", dragLetters)

//add data to letters
//make letters draggable
//make letters droppable
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