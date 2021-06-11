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

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let enteredWord = "";
let lowerWord = "";

/* A.1. Modify the provided initialPrompt() function to prompt the user to enter a word to score. */

function initialPrompt() {
  let errorFound = true;
  console.log("Let's play some Scrabble!\n");

  while (errorFound) {
    errorFound = false;
    
    enteredWord = input.question("Enter a word to score: "); 
    lowerWord = enteredWord.toLowerCase();

    if (lowerWord === '') {
      errorFound = true;
    } else {

      for (i=0; i<lowerWord.length && !errorFound; i++) {
        let ascii = Number(lowerWord.charCodeAt(i));
        
        // Error if not a space or non (a-z) character
        if ((ascii === 32) || (ascii >= 97 && ascii <= 122)) {
          errorFound = false;
        } else {
          errorFound = true;
        }

      }

    }

  }

}

/* B.1.1. simpleScore: Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point. */

let simpleScore = function (word) {
  let length = 0;

  for (i=0; i< word.length; i++) {

    if (word[i] !== ' ') {
      length += 1;
    }

  }

  return length;
};

/* B.1.2. vowelBonusScore: Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point. */

let vowelBonusScore = function (word) {
  const vowelArray = ['a', 'e', 'i', 'o', 'u'];
  let score = 0;

  for(i=0;i<word.length;i++) {

    if (vowelArray.includes(word[i])) {
      score += 3;
    } else if (word[i] !== ' ') {
      score += 1;    
    }

  }

  return score;
};

/* C.4. Once you've defined newPointStructure, use it to finish writing the scrabbleScore() function and then replace the oldScrabbleScorer() function in scoringAlgorithms with this new function. */

let scrabbleScore = function (word) {
  word = word.toLowerCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }

  return score;
};

/* B.2.1. Finish writing the scoringAlgorithms array. It should be populated with three objects, one for each of the three scoring options. Each object should contain three keys: name, description, and scorerFunction. 

B.2.2. Examine the table for the information to store in name and description. The scorerFunction for each object should be the name of one of the three scoring algorithms already defined. */

simpleScoreObj = { 
  name: 'Simple Score', 
  description: 'Each letter is worth 1 point.', 
  scoringFunction: simpleScore  
} 

vowelBonusObj = { 
  name: 'Bonus Vowels', 
  description: 'Vowels are 3 pts, consonants are 1 pt.', 
  scoringFunction: vowelBonusScore
}

scrabbleScoreObj = { 
  name: 'Scrabble', 
  description: 'The traditional scoring algorithm.', 
  scoringFunction: scrabbleScore
}

const scoringAlgorithms = [simpleScoreObj, vowelBonusObj, scrabbleScoreObj];

/* B.2.3. Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores their word. Use the selected algorithm to determine the score for the word. */

function scorerPrompt() {
let scorerPromptSelected = input.question(`\nWhich scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);

while ((scorerPromptSelected !== '0' && scorerPromptSelected !== '1' && scorerPromptSelected !== '2')) {
  scorerPromptSelected = input.question(`\nInvalid input. Try again: `);
}

scorerPromptSelected = Number(scorerPromptSelected);
return scoringAlgorithms[scorerPromptSelected];
}

function displayScore(option) {
  console.log(`\nScore for '${enteredWord}': ${option.scoringFunction(lowerWord)}`);
};

/* C.1. Write the rest of the transform() function. It will need to take an object as a parameter - specifically the oldPointStructure object. Calling transform(oldPointStructure) will return an object with lowercase letters as keys. The value for each key will be the points assigned to that letter. */

function transform(oldPointObj) {
  let newValue = 0;
  let newKey = '';
  let newPointObj = {};

  for (item in oldPointObj) {
    newValue = item;

    for(i=0;i < oldPointObj[item].length; i++) {

      newKey = oldPointObj[item][i].toLowerCase();
      newPointObj[newKey] = Number(newValue);
    }
  }
  
  return newPointObj;
};

/* C.2. Locate the newPointStructure object in the starter code and set it equal to transform(oldPointStructure). */
let newPointStructure = transform(oldPointStructure);

newPointStructure[' '] = 0;

function runProgram() {
   initialPrompt();

/* A.2. Use the oldScrabbleScorer() function provided to score the word provided by the user. Print the result to the console. */

// console.log(oldScrabbleScorer(enteredWord));

/* B.2.4. Call scorerPrompt() inside of runProgram() so that the program asks the user for a scoring algorithm after prompting for a word. Use the scoring object returned from scorerPrompt() to score the user's word and let the user know what score their word receives. */

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
