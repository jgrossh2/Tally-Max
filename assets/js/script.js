// Scrabble Word Generator

// page elements / DOM variables
var twoLetterBtnEl = document.getElementById('twoLetterBtn');
var threeLetterBtnEl = document.getElementById('threeLetterBtn');
var randomLetterBtnEl = document.getElementById('randomLetterBtn');
var highScoreBtnEl = document.getElementById('highScoreBtn');
var letterContainerEl = document.getElementById('possible-letters');
var searchContentEl = document.getElementById('search-content');
var resultsContainerEl = document.getElementById('results-container');
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");

// global page variables
var wordLength = 0;
var dropLetters = [];
// var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");
var noImage = "no-image.png"


// get user input area
// spaceEl.textContent = "Drag Letters Here! "

// drag letters
var dragLetters = function (event) {
    event.preventDefault();
    console.log("works")
}
// make letters drag
// $(".letter").draggable({ 
//     // connectToSortable: ".space",
//     tolerance: "pointer",
//     helper: "clone",
//     appendTo: ".space",
//     containment: "#container",
//     cursor: "move",
//     snap: ".space",
//     // snapMode: "inner",
//     revert: "invalid",
//     start: function(event, ui) {
//         console.log("uivalue " + JSON.stringify(ui));
//         //clone of tile
//         $(ui.helper).addClass("dragging");
//         console.log("test");
//         $(this).addClass("gray");
//     },
//     stop: function(event, ui) {
//         $(ui.helper).removeClass("dragging");
//         console.log("stop");
//     }
// });
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
            $(this).addClass("gray");
        }
        // start: function(event) {
        //     // ui.helper.toggleClass("highlight");
        //   },
        //   stop: function(event) {
        //     //   ui.helper.toggleClass("highlight");
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
        },
        stop: function (event, ui) {
        },
        remove: function (event, ui) {
            ui.item.clone().appendTo(".sortable4");
            $(this).sortable('cancel');
            $(this).addClass("gray");
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
            $(".dropped").addClass("dropZone");
        },
        stop: function (event, ui) {
        },
        remove: function (event, ui) {
            ui.item.clone().appendTo(".sortable4");
            $(this).sortable('cancel');
            console.log(this);
            $(this).addClass("gray");
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
        console.log(ui);
        console.log("drop");
        $(".dropped").addClass("dropZone");
        // var helper = ui.helper.clone(true);
        // helper.appendTo(".dropped");
        // $(ui.helper).removeClass("dragging");
        // $(".letter").draggable('disable');
        // finds object and then letter value of that object
        var dragged = ui.draggable[0].dataset.letter;
        console.log(ui.draggable[0].dataset.letter);
        //add drop letters to array
        dropLetters.push(dragged);
        console.log(dropLetters);
        // $(".space").removeClass("dropZone");
        // var compareLetters= [];
        // var getLetters = $(".letter").data("data-letter");
        // console.log(getLetters);
        // compareLetters.push(getLetters);
        // if (compareLetters )
    },
    // over: function(event, ui) {
    // },
    // out: function(event, ui) {
    // },
    // update: function(event) {
    // }
});
letterEl.addEventListener("click", dragLetters)

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

// highScoreBtnEl.addEventListener('click', function () {
//     // get possible letters from form
//     var letters = dropLetters.join('');

//     // get total letter count
//     letterCounter(letters);
//     function letterCounter(letters) {
//         // reset global variable
//         wordLength = 0;
//         var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//         var ar = alphabet.split("");
//         for (var i = 0; i < letters.length; i++) {
//             if (ar.indexOf(letters[i]) > -1) {
//                 wordLength = wordLength + 1;
//             }
//         }
//         return wordLength;
//     }

//     genWordList(wordLength, letters);
// });

// generate all possible combinations of inputted letters
var genWordList = function (wordLength, letters) {
    // reset form container
    spaceEl.innerHTML = " ";
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
    getDefData(results);

    // display letter array to page
    displayLetters(letters, results);

    return console.log(results);
};

// display searched letters
var displayLetters = function (letters, results) {
    if (results.length === 0) {
        searchContentEl.textContent = '';
        searchContentEl.textContent = 'No Words Found';
    } else {
        searchContentEl.textContent = '';
        searchContentEl.textContent = letters;
    }
}

// function fetches definition data for each in an array of words and returns subset of data packaged as an object
var getDefData = function (results) {
    // console.log(results)

    // generate API data for each word
    for (var i = 0; i < results.length; i++) {

        // let word = results[i];
        // var image = results[i];
        var pexelURL = `https://api.pexels.com/v1/search?query=${results[i]}&per_page=1`;
        var API_key = "563492ad6f91700001000001d01c380d928e472983ed037be8073298";

        // fetch both APIs
        var apiUrls = [
            fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${results[i]}?key=${smkmw}`),
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
                // resulting definition & image data for each word
                .then(function (response) {
                    // console.log(response)
                    // console.log(response[0][0])
                    // console.log(response[1])

                    // pass resulting object array to display function
                    objectData(results, response);
                    return response
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
        });
    };
};

var objectData = function(results, response) {
    console.log(results)
    console.log(response)
    var wordDef = response[0][0];
    console.log(wordDef)
    var imgSrc = response[1];
    console.log(imgSrc)

    // pull properties from both api elements into a single object for each word, taking into account the instance of an empty array for Pexel
    if (imgSrc.photos.length > 0) {
        var wordObj = {
            word: response[i],
            class: wordDef.fl,
            definition: wordDef.shortdef,
            audio: wordDef.hwi.prs[0].sound.audio,
            offensive: wordDef.meta.offensive,
            image_s: imgSrc.photos[0].src.small,
            image_m: imgSrc.photos[0].src.medium,
            image_l: imgSrc.photos[0].src.large,
            photographer: imgSrc.photos[0].photographer,
            photog_url: imgSrc.photos[0].photographer_url,
        }
    } else {
        var wordObj = {
            word: results[i],
            class: wordDef.fl,
            definition: wordDef.shortdef,
            audio: wordDef.hwi.prs[0].sound.audio,
            offensive: wordDef.meta.offensive,
            image_s: noImage,
            image_m: noImage,
            image_l: noImage,
            photographer: noImage,
            photog_url: noImage,
        }
    }
    console.log(wordObj)
}

// function takes api object array and parses for display
var displayWordData = function (wordObjArr) {
    console.log(wordObjArr)

    // loop through each object generated from the word-results array
    for (var i = 0; i < wordObjArr.length; i++) {
        console.log(wordObjArr[i])
        wordObj = wordObjArr[i]
        // check to see whether term is offensive
        if (!wordObj.offensive) {
            // create DOM elements
            var resultLI = document.createElement('li');
            resultLI.setAttribute('class', 'col-12');

            // display word within result container header
            var resultHeader = document.createElement('div');
            resultHeader.setAttribute('class', 'collapsible-header');
            resultHeader.innerHTML = '<p>' + wordObj.word + '</p>';

            // display audio-button within result-container body: takes 'audio' property from wordObj[i] and creates link for audio playback; conditions outlined in the Merriam-Webster api documentation are used to determine the 'subdir' value, which is a component of the audio-link href
            var aud = wordObj.audio.split('', 3)
            // this regular expression refers to any number (\d) or punctuation symbol (\W)
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
            var audioLink = 'https://media.merriam-webster.com/audio/prons/en/us/ogg/' + subdir + '/' + wordObj.audio + '.ogg';
            // console.log(audioLink)

            // create button element to contain sound link
            var audioBtn = document.createElement('a');
            audioBtn.setAttribute('class', 'btn-floating waves-effect waves-light')
            audioBtn.setAttribute('href', audioLink);
            audioBtn.innerHTML = '<span><img id="audio-icon" src="assets/iconfinder_speaker-high-sound-volume-voice_3643734.png"></span>'

            // create div body element for class, audio button, definitions, and image-modal
            var resultBody = document.createElement('div');
            resultBody.setAttribute('class', 'collapsible-body');
            resultBody.innerHTML = '<span>' + wordObj.class + '</span>';

            // loop through each homonym and display within element for that word
            for (var i = 0; i < wordObj.definition.length; i++) {
                n = i + 1
                var resultDef = document.createElement('p');
                resultDef.textContent = n + ') ' + wordObj.definition[i];
                resultBody.append(resultDef);
            }

            // Get the modal
            // var modal = document.getElementById("myModal");
            var modal = document.createElement('div');
            modal.setAttribute('id', myModal);
            modal.setAttribute('class', modal);
            // create container for modal header content
            var modalContent = document.createElement('div')
            modalContent.setAttribute('class', 'modal-content');
            modalContent.innerHTML = "<span class='close'>&times;</span><h4>Powered by Pexel</h4>";
            // create container for modal body content
            var modalBody = document.createElement('div');
            modalBody.setAttribute('class', 'modal-body');
            modalBody.setAttribute('id', 'img-body');
            // create container for modal footer content
            var modalFooter = document.createElement('div');
            modalFooter.setAttribute('class', 'modal-footer');
            modalFooter.setAttribute('id', 'ph-body');
            modalFooter.innerHTML = '<span class="close">&times;</span><h5>Photographer: </h5>';

            // Use 'getElementById' to get the ID of where the Img will be displayed
            var picBodyEl = document.getElementById('img-body');

            // Use 'getElementById' to get the ID of where the photographer name will be displayed
            var photographerEl = document.getElementById("ph-body");
            photographerEl.setAttribute('src', wordObj.photographer);

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
            // // Create an '<img>' element
            // var pexelImg = document.createElement('img');
            // var i = wordObj.imageInfo[0];
            // pexelImg.setAttribute('src', image_m); //response.photos[0].src.small);
            // picBodyEl.append(pexelImg);

            // for (var i = 0; i < wordObj.imageInfo[0].photographer.length; i++) {
            //     if (wordObj.imageInfo[0].photographer === resultHeader) {
            //         photographerEl.append(resultPhtr);
            //     } //also add if no image found-404 img-in assets file -results.length = 0(in array)

            //     var resultPhtr = document.createElement('span');
            //     resultPhtr.textContent = wordObj.imageInfo[0].photographer[i];
            //     photographerEl.append(resultPhtr);
            // }
        }
        else {
            resultHeader.innerHTML = "<p>This word did not make it past our sensors.</p>"
        }
    }
    // append content to page elements
    resultsContainerEl.append(resultLI);
    // results header
    resultLI.append(resultHeader);
    // results body (class, definitions, audio-button, image-button)
    resultLI.append(resultBody);
    resultBody.append(audioBtn);
    resultBody.append(imgBtn);
    // modal (via image-button)


    // picBodyEl.append(pexelImg);


    // document.addEventListener('click', imgBtn.onclick = function () {
    //     modal.style.display = "block"
    // });
};


