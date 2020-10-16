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
// // DEVELOPER.MOZILLA:Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }

//   postData('https://example.com/answer', { answer: 42 })
//     .then(data => {
//       console.log(data); // JSON data parsed by `data.json()` call
//     });

class Images {
    constructor() {
        this.API_key = "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf";
        //property in the photoGallery
        this.galleryDiv = document.querySelector(".gallery");
        this.searchForm = document.querySelector(".header form");
        this.load = document.querySelector(".load");
        this.eventHandler(); //call in constructor
    }
    //add handler
    eventHandler() {
        //with function '() => ' inside the eventListener, so the images load
        document.addEventListener("DOMContentLoaded", () => {
            // get another function to get image
            this.getImg();
            //fetch image inside the Handge function:
        });
    }
    async getImg() {
        //link from PEXEL for search pic: "https://api.pexels.com/v1/search?query=nature&per_page=1"
        var pexelURL = "https://api.pexels.com/v1/curated?per_page=1";
        var data = this.fetchImages(pexelURL);
        console.log(data)//(response); //use 'awain in fetch function to wait for the results to load on page- get a response
        //'await' goes together with 'async' -add to var
    }
    //add the function to fetch url, and call it above 
    fetchImages(pexelURL) {
        var response = await fetch(pexelURL, {
            method: "GET", //there are 5 methods total to use if needed
            headers: {
                Accept: 'application/json',
                Authorization: this.API_key
            }
        });
        var data = await response.json();
        return data; //return data and store it in var data above
    }
    generateHTML()

}
//initialize the class
var gallery = new Images;
// html div


/////////////
//https://api.pexels.com/v1/search?query=cat563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf
// var showImage = function (picture_array) {

//     picture_array.forEach(picture => {
//         //posWord or word you get form the dictionary


// var apiUrl = "https://api.pexels.com/v1/search?query=result";
// //         //make a get request for url
// fetch("https://api.pexels.com/v1/search?query=people", {
//     headers: {
//         Authorization: "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf"
//     }
//         .then(function (response) {
//             //request was sucessful
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data);
//                 });

//             } else {
//                 return
//             }
//         })
// })

      //     .then(response => response.json())
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err))


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

//to get random el by Id:
/* <p id="demo"></p>

<script>
document.getElementById("demo").innerHTML =
Math.floor(Math.random() * 11); */



//unsplash: acess key: "epv9i5i5P0XQj0_SD3Ez8WxX88fh9d8ts18CgJKJ0Uw"; secret key: "u9UGbWywxfI-tsOZU-Lvfd-qebY5WDF47_8Nhqc2Zms" //50 requests per hour //application status 5-10 days