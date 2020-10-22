// Scrabble Word Generator

// page elements
var twoLetterBtnEl = document.getElementById('twoLetterBtn');
var threeLetterBtnEl = document.getElementById('threeLetterBtn');
var randomLetterBtnEl = document.getElementById('randomLetterBtn');
var resetBtnEl = document.getElementById('resetBtn');
var letterContainerEl = document.getElementById('possible-letters');
var searchContentEl = document.getElementById('search-content');
var resultsContainerEl = document.getElementById('results-container');
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");
var aEl = document.getElementById('a');

// global page variables
var wordLength = 0;
var dropLetters = [];
// var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");

// drag letters
// var dragLetters = function (event) {
//     event.preventDefault();
//     console.log("works")
// }
//row 1 and dropzone
$(function () {
    $(".sortable1, .sortable4").sortable({
        // revert: true,
        containment: "#keyboard",
        tolerance: "pointer",
        cursor: "move",
        appendTo: "body",
        helper: "clone",
        placeholder: "highlight",
        connectWith: ".sortable4",
        items: ".tiles",
        start: function (event, ui) {
            ui.helper.addClass("dragging");
            $(".dropped").addClass("dropZone");
        },
        stop: function (event, ui) {
            $(".dropped").removeClass("dropZone");
        },
        remove: function (event, ui) {
            // $(this).sortable('disable');
            ui.item.clone().appendTo(".sortable4");
            $(this).sortable('cancel');
            // console.log(this);
           var done = $(ui.item).clone().attr('id');
           console.log(done);
           var oldTile = document.getElementById(done);
           $(oldTile).addClass("gray");
        //    $(oldTile).sortable(); 
        //    console.log("yes");
        //    $(oldTile).sortable('instance');
        //    console.log("no");
        //    $(oldTile).sortable("disable");
        //    console.log("works");
        //    $(oldTile).sortable('enable');
        //    console.log(oldTile);
        },
        over: function(event, ui) {
        },
        out: function(event, ui) {
        },
    }).disableSelection();
    $(".sortable4").sortable({
        connectWith: ".sortable4"
    }).disableSelection();
});
//row 2 and dropzone
$(function () {
    $(".sortable2, .sortable4").sortable({
        // revert: true,
        containment: "#keyboard",
        tolerance: "pointer",
        cursor: "move",
        appendTo: "body",
        helper: "clone",
        placeholder: "highlight",
        connectWith: ".sortable4",
        start: function (event, ui) {
            ui.helper.addClass("dragging");
            $(".dropped").addClass("dropZone");
            },
        stop: function (event, ui) {
            $(".dropped").removeClass("dropZone");
            },
        remove: function (event, ui) {
            ui.item.clone().appendTo(".sortable4");
            $(this).sortable('cancel');
            var done = $(ui.item).clone().attr('id');
            // console.log(done);
            var oldTile = document.getElementById(done);
            $(oldTile).addClass("gray");
            // $(oldTile).sortable();
            // var check = $(oldTile).sortable('instance');
            // console.log(check);
            // $(oldTile).sortable('disable');
        }
    }).disableSelection();
    $(".sortable4").sortable({
        connectWith: ".sortable4"
    }).disableSelection();
});
//row 3 and drop area
$(function () {
    $(".sortable3, .sortable4").sortable({
        // revert: true,
        containment: "#keyboard",
        tolerance: "pointer",
        cursor: "move",
        appendTo: "body",
        helper: "clone",
        placeholder: "highlight",
        connectWith: ".sortable4",
        start: function (event, ui) {
            ui.helper.addClass("dragging");
            $(".dropped").addClass("dropZone");
        },
        stop: function (event, ui) {
            $(".dropped").removeClass("dropZone");
        },
        remove: function (event, ui) {
            ui.item.clone().appendTo(".sortable4");
            $(this).sortable('cancel');
            var done = $(ui.item).clone().attr('id');
            // console.log(done);
            var oldTile = document.getElementById(done);
            $(oldTile).addClass("gray");
            // $(oldTile).sortable();
            // console.log("yes");
            // var check = $(oldTile).sortable('instance');
            // console.log(check);
            // $(oldTile).sortable('disable');
             
        }
    }).disableSelection();
    $(".sortable4").sortable({
        connectWith: ".sortable4"
    }).disableSelection();
});
//make dropzone
$(".dropped").droppable({
    accept: ".letter",
    tolerance: "touch",
    revert: false,
    drop: function (event, ui) {
        // console.log(ui);
        // console.log("drop");
        $(".dropped").addClass("dropZone");
        // $(this).sortable('disable');
        // var helper = ui.helper.clone(true);
        // $(".letter").draggable('disable');
        // finds object and then letter value of that object
        var dragged = ui.draggable[0].dataset.letter;
        // console.log(dragged);
        // var droppedDone = $(dragged).attr('id');
        // console.log(droppedDone);
        // var dragTile = document.getElementById(droppedDone);
        // dragTile.sortable('disable');

        //add drop letters to array
        dropLetters.push(dragged);
    },
    over: function(event, ui) {
    },
    out: function(event, ui) {
    },
    update: function(event) {
    }
});
// letterEl.addEventListener("click", dragLetters)

// event listeners to gather user input and start generator function
twoLetterBtnEl.addEventListener('click', function () {
    // get possible letters from form
    var letters = dropLetters.join('');
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 2;
    // call word generator
    genWordList(wordLength, letters);
});

threeLetterBtnEl.addEventListener('click', function () {
    // get possible letters from form
    var letters = dropLetters.join('');
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 3;
    // call word generator
    genWordList(wordLength, letters);
});

randomLetterBtnEl.addEventListener('click', function () {
    // sort letters based on value before sending to genWordList
    function sortFunc(a, b) {
        var priorityLetters = ['z','q','x','j','k','w','y','v','f','h','o','m','c','b','g','d','u','s','l','t','r','n','o','i','a','e'];
            return priorityLetters.indexOf(a) - priorityLetters.indexOf(b);
    }
    dropLetters.sort(sortFunc);
    
    // get possible letters from form
    var letters = dropLetters.join('');

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
    genWordList(wordLength, letters);
});
resetBtnEl.addEventListener('click', function () {
    // reset serch containers & arrays
    spaceEl.innerHTML = " ";
    dropLetters = [];
    var results = [];
});
// generate all possible combinations of inputted letters
var genWordList = function (wordLength, letters) {
    // reset search containers & arrays
    spaceEl.innerHTML = " ";
    // resultsContainerEl.textContent = '';
    dropLetters = [];
    var results = [];
    var arrayCounter = 0;

    var generate = function (possWord) {
        for (var i = 0; i < letters.length; i++) {
            if (arrayCounter <= 11) {
                possWord += letters[i];
                if (possWord.length === wordLength) {
                    if (dict.includes(possWord)) {
                        results.push(possWord);
                        arrayCounter++;
                    }
                } else {
                    generate(possWord);
                }
                possWord = possWord.slice(0, -1);
                // break from loop to cut down on load time    
            } else {
                break;
            }
        }
    }
    generate("");

    // store user search / results
    localStorage.setItem(letters, results);

    // get data from API
    getDefData(letters, results);
    return console.log(results);
};

// function fetches definition data for each in an array of words and returns subset of data packaged as an object
var getDefData = function (letters, results) {
    // display searched letters
    if (results.length === 0) {
        searchContentEl.textContent = '';
        searchContentEl.textContent = 'No Words Found';
    } else {
        searchContentEl.textContent = '';
        searchContentEl.textContent = letters;
    }

    // var wordDataArr = [];
    
    // generate API data for each word
    for (var i = 0; i < results.length; i++) {
        // api variables
        let word = results[i];
        var images = results[i];
        var pexelURL = `https://api.pexels.com/v1/search?query=${images}&per_page=1`;
        var API_key = "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf";

        // fetch both APIs
        var apiUrls = [
            fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${smkmw}`),
            fetch(pexelURL, {
                headers: {
                    // Accept: 'application/json',
                    Authorization: API_key
                    //credentials: 'include'
                }
            }),
        ];
        // submit https request
        Promise.all(apiUrls).then(function (responses) {
            // using map() method to get a response array of json objects, 
            return Promise.all(responses.map(function (response) {
                return response.json();
            }))
            // word definition
            .then(function (response) {
                var wordDef = response[0];
                var imgSrc = response[1];

                var def = (wordDef[0])
                var wordData = {
                    word: word,
                    class: def.fl,
                    definition: def.shortdef,
                    audio: def.hwi.prs[0].sound.audio,
                    offensive: def.meta.offensive,
                    imageInfo: imgSrc.photos,
                };
                console.log(wordData);
                displayWord(wordData);
                // wordDataArr.push(wordData);
                // displayWord(wordDataArr);
                return wordData
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
        });
    };
};

// function takes MW api object data and packages word & class (e.g. noun, verb adjective) for DOM object display
var displayWord = function (wordData) {
    console.log(wordData)

    // check to see whether term is offensive
    if (!wordData.offensive) {
        // create DOM elements
        var resultLI = document.createElement('li');
        resultLI.setAttribute('class', 'col-12');

        // display word within result container header
        var resultHeader = document.createElement('div');
        resultHeader.setAttribute('class', 'collapsible-header');
        resultHeader.innerHTML = '<p>' + wordData.word + '</p>';

        // display class, definitions and sound button within result container body
        // takes audio file reference and creates link for audio playback; 'subdir' uses conditions provided by MW api documentation to determine 'subdir' component of href
        var aud = wordData.audio.split('', 3)
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
        var audioLink = 'https://media.merriam-webster.com/audio/prons/en/us/ogg/' + subdir + '/' + wordData.audio + '.ogg';
        // console.log(audioLink)

        // create button element to contain sound link
        var audioBtn = document.createElement('a');
        audioBtn.setAttribute('class', 'btn-floating waves-effect waves-light')
        audioBtn.setAttribute('href', audioLink);
        audioBtn.innerHTML = '<span><img id="audio-icon" src="assets/iconfinder_speaker-high-sound-volume-voice_3643734.png"></span>'

        // Get the modal
        var modal = document.getElementById("myModal");

        // Use 'getElementById' to get the ID of where the Img will be displayed
        var picBodyEl = document.getElementById('img-body');

        // Use 'getElementById' to get the ID of where the photographer name will be displayed
        var photographerEl = document.getElementById("ph-body");
        photographerEl.setAttribute('src', wordData.imageInfo[0].photographer);

        // Get the button that opens the modal
        var imgBtn = document.createElement('a')//addEventListener('click', onclick);
        imgBtn.setAttribute('class', 'btn-floating waves-effect waves-light red disabled')
        imgBtn.innerHTML = '<span><img id="info-icon" src="assets/iconfinder_Information_Circle_4781829.png"></span>'

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        imgBtn.onclick = function () {
            modal.style.display = "block";

        }// When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";

        }// When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        // create div body element for class, audio button, and definitions
        var resultBody = document.createElement('div');
        resultBody.setAttribute('class', 'collapsible-body');
        resultBody.innerHTML = '<span>' + wordData.class + '</span>';

        // loop through each homonym and display within element for that word
        for (var i = 0; i < wordData.definition.length; i++) {
            n = i + 1
            var resultDef = document.createElement('p');
            resultDef.textContent = n + ') ' + wordData.definition[i];
            resultBody.append(resultDef);
        }
        // Create an '<img>' element//might need to create for loop for images 
        var pexelImg = document.createElement('img');
        var i = wordData.imageInfo[0];
        pexelImg.setAttribute('src', wordData.imageInfo[0].src.medium); //response.photos[0].src.small);
        picBodyEl.append(pexelImg);
        //for loop for photographer info(started, not functioning )
        for (var i = 0; i < wordData.imageInfo[0].photographer.length; i++) {
            if (wordData.imageInfo[0].photographer === resultHeader) {
                photographerEl.append(resultPhtr);
            } //also add if no image found-404 img-in assets file -results.length = 0(in array)

            var resultPhtr = document.createElement('span');
            resultPhtr.textContent = wordData.imageInfo[0].photographer[i];
            photographerEl.append(resultPhtr);
        }
    }
    else {
        console.log("Sorry, this word cannot be displayed.");
    }
    // append content to page elements
    resultBody.append(audioBtn);
    resultLI.append(resultHeader);
    resultLI.append(resultBody);
    resultsContainerEl.append(resultLI);
    resultBody.append(imgBtn);

    // document.addEventListener('click', imgBtn.onclick = function () {
    //     modal.style.display = "block"
    // });
};

