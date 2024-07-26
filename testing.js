let prompt = require('prompt-sync')();
let dictionary = require('./sections.json');

//initialize
let game_word = 'cane';
let undo = 2;
let new_words = 0;
let used_words = [];
let mistakes = 5;

//track used words and disallow repeats


while (mistakes > 0) {
    
    //print current word
    console.log("the current word is " + game_word);

    //get the word from user
    let word = prompt("Enter your next word here: ");

    //get first letter of word
    let firstLetter = word.charAt(0);

    //check if word is in dictionary and unused, if so, update
    if (dictionary[firstLetter].includes(word)) {
        
        //used?
        if (used_words.includes(word)) {
            console.log("You've already used " + word + ". Try again!")
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