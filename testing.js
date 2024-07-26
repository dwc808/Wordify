let prompt = require('prompt-sync')();
let dictionary = require('./sections.json');

//initialize
let game_word = 'cane';
let undo = 2;
let new_words = 0;
let used_words = [];
let mistakes = 5;

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

while (mistakes > 0) {
    
    //print current word
    console.log("the current word is " + game_word);

    //get the word from user
    let word = prompt("Enter your next word here: ");

    //get first letter of word
    let firstLetter = word.charAt(0);

    //check if word is in dictionary and unused, if so, update
    if (dictionary[firstLetter].includes(word)) {
        
        //try again if word has already been used
        if (used_words.includes(word)) {
            console.log("You've already used " + word + ". Try again!")
            continue
        }
        
        //validate word
        if (validate_length(game_word, word)) {
            if (validate_word(game_word, word)) {

            }
            else {
                console.log("You've changed more than one letter. Try again!")
                continue
            }
        }
        else {
            console.log("You've changed more than one letter. Try again!")
            continue
        }

        game_word = word;
        used_words.push(word)
        new_words += 1;
        console.log("You've made " + new_words + " words!")
    }
    else {
        mistakes -= 1;
        console.log("Invalid word. You have " + mistakes + " mistakes left.")
    }

}