// Scrabble Word Generator

// page elements
var twoLetterBtnEl = document.getElementById('twoLetterBtn');
var threeLetterBtnEl = document.getElementById('threeLetterBtn');
var randomLetterBtnEl = document.getElementById('randomLetterBtn');
var letterContainerEl = document.getElementById('possible-letters');

// global page variables
var wordLength = 0;
var totalLetters = 0;
var dropLetters = [];
// var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");
// get user input area
spaceEl.textContent = "Drag Letters Here! "
// drag letters
var dragLetters = function(event) {
    event.preventDefault();
    console.log("works")
}

// $("#sortable").sortable({
//     revert: true,
//     axis: "x",
// });
// make letters drag
$(".letter").draggable({ 
    // connectToSortable: ".space",
    tolerance: "pointer",
    helper: "clone",
    appendTo: ".space",
    containment: "#container",
    cursor: "move",
    snap: ".space",
    // snapMode: "inner",
    revert: "invalid",
    start: function(event, ui) {
        console.log("uivalue " + JSON.stringify(ui));
        //clone of tile
        $(ui.helper).addClass("dragging");
        console.log("test");
        $(this).addClass("gray");
    },
    stop: function(event, ui) {
        $(ui.helper).removeClass("dragging");
        console.log("stop");
    }
});

$((".space").children).sortable({
    revert: true,
    placeholder: "highlight",
    axis: "x",
    connectWith: $(".dropped"),
    tolerance: "pointer",
    helper: "clone",
    appendTo: ".space",
    // start: function(event) {
    //     ui.helper.toggleClass("highlight");
    //   },
    //   stop: function(event) {
    //       ui.helper.toggleClass("highlight");
    //     // $(".bottom-trash").removeClass("dropover bottom-trash-drag");
    //     console.log("deactivate", this);
    //   },
    //   over: function(event) {
    //     // $(event.target).addClass("dropover-active");
    //   },
    //   out: function(event) {
    //     // $(event.target).removeClass("dropover-active");
    //     console.log("out", event.target);
    //   },
})
//pull tiles into dropzone if overlap

//make dropzone
$(".space").droppable({
    accept: ".letter",
    tolerance: "touch",
    revert: false,
    drop: function(event, ui){
        console.log(ui);
        console.log("drop");
        var helper = ui.helper.clone(true);
        helper.appendTo(".space");
        $(ui.helper).removeClass("dragging");
        // $(".letter").draggable('disable');
        // finds object and then letter value of that object
        var dragged= ui.draggable[0].dataset.letter;
        console.log(ui.draggable[0].dataset.letter);
        //add drop letters to array
        dropLetters.push(dragged);
        console.log(dropLetters);
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
    }
});

// grays out letter on drop, find ids and match


letterEl.addEventListener("click", dragLetters)

// event listeners to gather user input and start generator function
twoLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 2;
    // call word generator
    genWordlist(wordLength, letters);
});

threeLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 3;
    // call word generator
    genWordlist(wordLength, letters);
});

randomLetterBtnEl.addEventListener('click', function() {
    // get possible letters from form
    var letters = letterContainerEl.value;

    // get total letter count
    letterCounter(letters);
    function letterCounter(letters) {
        // reset global variable
        wordLength = 0;   
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ar = alphabet.split("");
        for (var i = 0; i < letters.length; i++) {
            if (ar.indexOf(letters[i]) > -1) {
                wordLength = wordLength + 1;
            }
        }
        return wordLength;
    }
    // call word generator
    genWordlist(wordLength, letters);
});

// generate all possible combinations of input letters
var genWordlist = function(wordLength, letters) {
    // reset form container
    letterContainerEl.value = '';
    var results = [];

    var generate = function(possWord) {
        for (var i = 0; i < letters.length; i++) {
        possWord += letters[i];
        if (possWord.length === wordLength) {
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

    // store user search / results
    localStorage.setItem(letters, results);

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
                    // displaySoundBite(wordDef
                   
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
    var resultDivEl = document.querySelector('ul.collapsible.popout');
    
    // check to see whether term is offensive
    if (!defObject.offensive) {
        // create DOM elements
        var resultLI = document.createElement('li');
        resultLI.setAttribute('class', 'col s12 m6 l3');
        
        // display word within result container header
        var resultHeader = document.createElement('div');
        resultHeader.setAttribute('class', 'collapsible-header');
        resultHeader.innerHTML = '<p>' + defObject.word + '</p>';
        
        // display class, definitions and sound button within result container body

        // takes audio file reference and creates link for audio playback; 'subdir' uses conditions provided by MW api documentation to determine 'subdir' component of href
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
        
        // create button element to contain sound link
        var audioBtn = document.createElement('a');
        audioBtn.setAttribute('class', 'btn-floating waves-effect waves-light red')
        audioBtn.setAttribute('href', audioLink);
        audioBtn.innerHTML = '<span><img id="audio-icon" src="assets/iconfinder_speaker-high-sound-volume-voice_3643734.png"></span>'
        
        // create div body element for class, audio button, and definitions
        var resultBody = document.createElement('div');
        resultBody.setAttribute('class', 'collapsible-body');
        resultBody.innerHTML = '<span>' + defObject.class + '</span>';
        
        // loop through each homonym and display within element for that word
        for (var i = 0; i < defObject.definition.length; i++) {
            n = i + 1
            var resultDef = document.createElement('p');
            resultDef.textContent = n + ') ' + defObject.definition[i];
            resultBody.append(resultDef);
        }    
        
        // append content to page elements
        resultDivEl.append(resultLI);
        resultLI.append(resultHeader);
        resultBody.append(audioBtn);
        resultLI.append(resultBody);
    } else {
        console.log("Sorry, this word cannot be displayed.");
    }

}
