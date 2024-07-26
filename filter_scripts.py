import json

def to_json():
    """Convert the word text file to a JSON list"""
    
    with open('unix-words.txt', 'r') as file:
        json_list = []
        for line in file.readlines(): 
            json_list.append(line.strip())

    with open('words.json', 'w') as file:
        file.write(json.dumps(json_list))

def remove_caps():
    """For removing proper nouns from the word list."""
    
    with open('words.json') as file:
        words = json.load(file)

    for word in words:
        if word.istitle():
            words.remove(word)

    with open('words.json', 'w') as file:
        file.write(json.dumps(words))


def remove_short():
    """For removing words with 3 or fewer letters."""

    with open('words.json') as file:
        words = json.load(file)

    for word in words:
        if len(word) < 3:
            words.remove(word)

    with open('words.json', 'w') as file:
        file.write(json.dumps(words))

def add_sections():
    """Convert the list into a dictionary that allows searching by first letter."""
    
    with open('words.json') as file:
        words = json.load(file)

    sections = {}

    for letter in "abcdefghijklmnopqrstuvwxyz":
        sections[letter] = []

    for word in words:
        if word[0].islower():
            sections[word[0]].append(word)

    with open('sections.json', 'w') as file:
        file.write(json.dumps(sections))




#for later features

def check_word(word):
    """For checking suggested or challenged words against Merriam's Dictionary to add or remove."""

    pass


def add_word(word):
    """Find the proper place for the word and add it to the game list."""

    pass


def remove_word(word):
    """Find and remove the word from the game list."""

    pass


add_sections()
