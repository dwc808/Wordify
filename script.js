import { DICTIONARY } from "./dictionary.js";

//initialize
let game_word = 'cane';
let guess_word = '';
let undo = 2;
let score = 0;
let used_words = [];
let mistakes = 5;

//more initialize
let todays_word = document.getElementById("current-word");
used_words.push(game_word)
let current_word = document.createElement("h2");
current_word.textContent = game_word;
todays_word.appendChild(current_word);
let scoreboard = document.getElementById("score");
let show_score = document.createElement("h3");
show_score.textContent = "Score: " + score;
scoreboard.appendChild(show_score);


//update the score
function updateScore(length) {
    if (length === 3) {
        score += 1
    }
    if (length === 4) {
        score += 2
    }
    if (length === 5) {
        score += 5
    }
    if (length === 6) {
        score += 10
    }
    if (length === 7) {
        score += 20
    }
    if (length >= 8) {
        score += 50
    }
}

//submit the word
function submitWord(word) {
    
    //get first letter of word
    let firstLetter = word.charAt(0);
    console.log(firstLetter)
    //check if word is in dictionary, unused, and valid
    if (DICTIONARY[firstLetter].includes(word)) {
        //return if word has been used
        console.log("check 1")
        if (used_words.includes(word)) {
            //TODO - implement a message telling user word has been used
            return
        }
        
        //validate word
        if (validate_length(game_word, word)) {
            if (validate_word(game_word, word)) {

            }
            else {
                //TODO implement explanation
                return
            }
        }
        else {
            //TODO implement explanation
            return
        }

        game_word = word;
        used_words.push(word)
        updateScore(game_word.length)
        //update score on screen
        let scorediv = document.getElementById("score")
        let scoreboard = scorediv.firstElementChild
        scoreboard.textContent = "Score: " + score
        current_word.textContent = game_word

        //restart entry box
        let guess = document.getElementById("submit_word")
        while (guess.children.length > 1) {
            guess.removeChild(guess.lastChild)
        }
        guess.firstElementChild.textContent = ""
        guess_word = ""
        
        
    }
    else {
        //TODO a message again
        return
    }
}

//display typed letters to guess
function typeLetter (letter) {
    
    //don't allow more letters than length + 1 of current word
    letter = letter.toLowerCase()

    let guess = document.getElementById("submit_word")
    let boxes = guess.children
    let current_length = boxes.length;

    console.log(boxes)

    for (let i = 0; i < current_length; i++) {
        let box = boxes.item(i)
        if (box.textContent.trim() == "") {
            //fill empty box with letter
            box.textContent = letter;
            guess_word = guess_word + letter;
            
            //add empty box to end (unless max length already)
            if (guess.children.length < game_word.length + 1) {
                let new_box = document.createElement("div")
                new_box.className = "letter"
                guess.appendChild(new_box)
            }
            
        }
    }
}

//backspace in guess
function backspace() {
    let guess = document.getElementById("submit_word")
    
    //do nothing if no letters yet
    if (guess.children.length === 1) {
        return
    }

    //if at max-length, empty final box
    if (guess.children.length === game_word.length+1 && guess.lastElementChild.textContent != "") {
        guess.lastElementChild.textContent = ""
    } else {
    //delete last letter entered
    guess.lastElementChild.previousElementSibling.remove()
    }
    //delete word from guess
    guess_word = guess_word.substring(0, guess_word.length - 1);
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


//listen for word submission
document.addEventListener("keyup", (e) => {
    
    let pressed = String(e.key)

    //delete letters
    if (pressed === "Backspace") {
        backspace()
    }
    //submit guess
    if (pressed === "Enter") {
        submitWord(guess_word)
    }


    //add letter
    let letter = String(pressed.match(/[a-z]/gi))

    if (letter.length > 1) {
        return
    } else {
        typeLetter(letter)
    }

})