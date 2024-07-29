import { DICTIONARY } from "./dictionary.js";

//initialize
let game_word = 'cane';
let undo = 2;
let score = 0;
let used_words = [];
let mistakes = 5;

//display typed letters to guess
function typeLetter (letter) {
    
    //don't allow more letters than length + 1 of current word
    console.log("Entering Type Letter")
    letter = letter.toLowerCase()

    let guess = document.getElementById("submit_word")
    let boxes = guess.children;
    let current_length = boxes.length;

    console.log(boxes)

    for (let i = 0; i < current_length; i++) {
        console.log("Entering Loop")
        let box = boxes.item(i)
        if (box.textContent.trim() == "") {
            //fill empty box with letter
            box.textContent = letter;
            //add empty box to end
            let new_box = document.createElement("div")
            new_box.className = "letter"
            guess.appendChild(new_box)
        }
    }
}

//validate word length is within 1
function validate_length(word, new_word) {

    //ensure that length is within 1 character
    if (new_word.length >= word.length - 1 && new_word.length <= word.length + 1) {
        return true
    }
} 

//validate that only one character has been changed
function validate_word(word, new_word) {
    
    //initialize a pointer for each word
    let p1 = 0;
    let p2 = 0;

    //if lengths are identical, count differences to ensure only one swap
    if (word.length == new_word.length) {
        
        //iterate across both words, counting differences
        let diff = 0;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(p1) !== new_word.charAt(p2)) {
                diff += 1;
            }
            p1 += 1;
            p2 += 1;
        }
        //valid only if there is 1 difference
        if (diff == 1) {
            return true
        }    
        else {
            return false
        }
        
    }
    
    //added a character
    if (new_word.length == word.length + 1) {
        let same = 0;
        for (let i = 0; i < new_word.length; i++) {
            if (word.charAt(p1) == new_word.charAt(p2)) {
                same +=1;
                p1 +=1;
                p2 +=1;
            }
            else {
                p2 +=1;
            }
        }
        if (same == word.length) {
            return true
        }
        else {
            return false
        }
    }   
        
    //removed a character
    if (new_word.length == word.length - 1) {
        let same = 0;
        for (let i = 0; i <= new_word.length; i++) {
            if (word.charAt(p1) == new_word.charAt(p2)) {
                same +=1;
                p1 +=1;
                p2 +=1;
            }
            else {
                p1 +=1;
            }
        }
        if (same == new_word.length) {
            return true
        }
        else {
            return false
        }
    }

}

function display_start() {
    let todays_word = document.getElementById("current-word");
    let word = document.createElement("h2");
    word.textContent = game_word;
    todays_word.appendChild(word);
    let scoreboard = document.getElementById("score");
    let show_score = document.createElement("h3");
    show_score.textContent = "Score: " + score;
    scoreboard.appendChild(show_score);
}

display_start();

//listen for word submission
document.addEventListener("keyup", (e) => {
    
    let pressed = String(e.key)

    //delete letters

    //submit guess

    //add letter
    let letter = String(pressed.match(/[a-z]/gi))

    if (letter.length > 1) {
        return
    } else {
        typeLetter(letter)
    }

})