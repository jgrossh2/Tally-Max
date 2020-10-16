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
    cursor: "move",
    snap: ".space",
    // revert: true,
    activate: function (event) {
        $(".letter").addClass("tileColor");
        console.log("color")
    }
});
// $(".letter").sortable({
//     connectWith: $(".space .letter"),
//     tolerance: "pointer",
//     helper: "clone",
//     activate: function(event) {
//         $(".space").addClass("dropZone");
//         console.log("activate", this);
//       },
//       deactivate: function(event) {
//         // $(".bottom-trash").removeClass("dropover bottom-trash-drag");
//         console.log("deactivate", this);
//       },
//       over: function(event) {
//         // $(event.target).addClass("dropover-active");
//       },
//       out: function(event) {
//         // $(event.target).removeClass("dropover-active");
//         console.log("out", event.target);
//       },
// })
//make dropzone
$(".space").droppable({
    accept: ".letter",
    tolerance: "touch",
    revert: false,
    drop: function(event, ui) {
        console.log("drop");
        var helper = ui.helper.clone();
        helper.appendTo(".space")
        $(".space").removeClass("dropZone");
    },
 
    over: function(event, ui) {
        $(".space").addClass("dropZone");
        console.log("over");
    },
    out: function(event, ui) {
        $(".space").removeClass("dropZone");
        console.log("out");

    },
    update: function(event) {
        console.log(this)
        $(this).each(function() {
            //get letter value and point score
            var letterVal= $(this).getVal();
            dropLetters.push(letterVal);
            console.log(letterVal)

        })
    },
    //put dropped tiles in array
    // saveTiles();
});
//drop tiles in array
// var saveTiles = function() {
//     var tileVal = $()

// }
//only accept so many of each letter
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
