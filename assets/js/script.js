// Scrabble Word Generator

// page elements

// page variables
var totalLetters = 0;
var dropLetters = [];
var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");
// get user input area
spaceEl.textContent = "Drag Letters Here! "
// drag letters
var dragLetters = function(event) {
    event.preventDefault();
    console.log("works")
}
// make letters drag
$(".letter").draggable({ 
    tolerance: "pointer",
    helper: "clone",
    appendTo: ".space",
    containment: "#keyboard",
    cursor: "move",
    snap: ".space"
});
// $(document).on("click",".letter", function(){
//     var letterVal= $(this).attr("data-letter");
//             dropLetters.push(letterVal);
//             console.log(letterVal);
// });

// $(".letter").sortable({
//     connectWith: $(".space .letter"),
//     tolerance: "pointer",
//     helper: "clone",
//     activate: function(event) {
//         var letterVal= $(this).attr("data-letter");
//             dropLetters.push(letterVal);
//             console.log(letterVal);
        // $(".space").addClass("dropZone");
        // console.log("activate", this);
    //   },
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
//pull tiles into dropzone if overlap
//make dropzone
$(".space").droppable({
    accept: ".letter",
    tolerance: "touch",
    revert: false,
    drop: function(event, ui){
        //FIND ELEMENT DRAGGED AS TARGET
        console.log(ui);
        // var letterVal= $(ui.draggable).clone();
        // console.log(letterVal);
        // var now = letterVal.val();
        // console.log(now);
            // dropLetters.push(now);
            // console.log(this);
            // console.log(letterVal);
        console.log("drop");
        var helper = ui.helper.clone();
        helper.appendTo(".space");
        // finds object and then letter value of that object
        
        var valueLetter= $(".space").children;
        console.log(valueLetter);
        var dragged= valueLetter.val();
        console.log(dragged);
        dropLetters.push(dragged);
        $(".space").removeClass("dropZone");
        },
        // $(this).each(function( ) {
            // var letterVal= $(this).attr("data-letter");
        // });
 
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
    }
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
