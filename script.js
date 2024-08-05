import { DICTIONARY } from "./dictionary.js";

//initialize
let game_word = 'start';
let guess_word = '';
let undo = 2;
let score = 0;
let used_words = [];

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

//fadeout score
function fadeOut(element) {
    let opacity = 1
    let timer = setInterval(function () {
        if (opacity <= 0.2) {
            clearInterval(timer)
            element.remove();
        }
        element.style.opacity = opacity
        opacity -= .1
    }, 85)
}

//update the score
function updateScore(length) {
    //create element to display score
    let score_plus = document.createElement("h4");
    score_plus.style.color = "green";
    let score_tip = 0
    
    if (length === 3) {
        score += 1
        score_tip = 1
    }
    if (length === 4) {
        score += 2
        score_tip = 2
    }
    if (length === 5) {
        score += 5
        score_tip = 5
    }
    if (length === 6) {
        score += 10
        score_tip = 10
    }
    if (length === 7) {
        score += 20
        score_tip = 20
    }
    if (length >= 8) {
        score += 50
        score_tip = 50
    }

    score_plus.textContent = "+ " + score_tip
    scoreboard.appendChild(score_plus)
    fadeOut(score_plus)
}

//submit the word
function submitWord(word) {
    
    //get first letter of word
    let firstLetter = word.charAt(0);
    console.log(firstLetter)
    //check if word is in dictionary, unused, and valid
    if (DICTIONARY[firstLetter].includes(word)) {
        //return if word has been used
        if (used_words.includes(word)) {
            
            let alert = document.getElementById("invalid_words");
            alert.textContent = "You have already used this word."
            alert.style.visibility = 'visible'

            return
        }
        
        //validate word
        if (validate_length(game_word, word)) {
            if (validate_word(game_word, word)) {

            }
            else {               
                let alert = document.getElementById("invalid_words");
                alert.textContent = "You changed too many letters."
                alert.style.visibility = 'visible'
                return
            }
        }
        else {
            
            let alert = document.getElementById("invalid_words");
            alert.textContent = "Your word is too short."
            alert.style.visibility = 'visible'

            return
        }

        //update word, used words, display used word
        let used_display = document.getElementById("used_words")
        used_display.textContent = used_display.textContent + "      " + game_word
        game_word = word
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
        let alert = document.getElementById("invalid_words");
            alert.textContent = "Not a valid word."
            alert.style.visibility = 'visible'
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

//close tooltip
document.getElementById("close").addEventListener("click", function() {
    document.getElementById("rules").style.display = "none"
})

//listen for letter/word submission
document.addEventListener("keyup", (e) => {
    
    let pressed = String(e.key)

    let alert = document.getElementById("invalid_words") 
        
    if (alert.style.visibility == "visible") {
        alert.style.visibility = "hidden"
    }
    

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

