// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let enteredWord = "";
let lowerWord = "";

function initialPrompt() {
  enteredWord = input.question(`Let's play some Scrabble!

Enter a word to score: `); 
lowerWord = enteredWord.toLowerCase();
}

let simpleScore = 0;
let vowelBonusScore = 0;
let scrabbleScore = 0;
  
/*  function oldScrabbleScorer(word) {
    let letterPoints = "\n";
    
    for (let i = 0; i < word.length; i++) {
  
      for (const pointValue in oldPointStructure) {
  
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }
  
      }
    }
    return letterPoints;
}*/

const scoringAlgorithms = [ 
  Object({ 
    name: 'Simple Score', 
    description: 'Each letter is worth 1 point.', scorerFunction:function (word) {
      simpleScore = word.length;
      return simpleScore;
    }
  }), 
  Object({ 
    name: 'Bonus Vowels', 
    description: 'Vowels are 3 pts, consonants are 1 pt.', scorerFunction:function (word) {
      const vowelArray = ['a', 'e', 'i', 'o', 'u'];
      for(i=0;i<word.length;i++) {
        if (vowelArray.includes(word[i])) {
          vowelBonusScore += 3;
        } else {
          vowelBonusScore += 1;    
        }
      }
      return vowelBonusScore;
    } 
  }), 
  Object({ 
    name: 'Scrabble', 
    description: 'The traditional scoring algorithm.', scorerFunction:function (word) {
      word = word.toLowerCase();
      for (let i = 0; i < word.length; i++) {
        scrabbleScore += Number(newPointStructure[word[i]]);
      }
      return scrabbleScore;
    } 
  })
];

function scorerPrompt() {
let scorerPromptSelected = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);

return scoringAlgorithms[scorerPromptSelected];
}

function displayScore(option) {
  console.log(`Score for '${enteredWord}': ${option.scorerFunction(lowerWord)}`);
};

function transform(oldPointObj) {
  let newValue = 0;
  let newKey = '';
  let newPointObj = {};

  for (item in oldPointObj) {
    newValue = item;

    for(i=0;i < oldPointObj[item].length; i++) {

      newKey = oldPointObj[item][i].toLowerCase();
      newPointObj[newKey] = newValue;
    }
  }

  return newPointObj;
};

let newPointStructure = transform(oldPointStructure);
upperWord = enteredWord.toUpperCase();
function runProgram() {
   initialPrompt();
   let optionSelected = scorerPrompt();
   displayScore(optionSelected);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

