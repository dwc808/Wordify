let prompt = require('prompt-sync')();
let dictionary = require('./sections.json');

let game_word = 'cane';
let mistakes = 5;
let new_words = 0;

while (mistakes > 0) {
    
    //print current word
    console.log("the current word is " + game_word);

    //get the word from user
    let word = prompt("Enter your next word here: ");

    //get first letter of word
    let firstLetter = word.charAt(0);

    //check if word is in dictionary, if so, update
    if (dictionary[firstLetter].includes(word)) {
        game_word = word;
        new_words += 1;
        console.log("You've made " + new_words + " words!")
    }
    else {
        mistakes -= 1;
        console.log("Invalid word. You have " + mistakes + " mistakes left.")
    }

}