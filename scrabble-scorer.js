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

const vowelPointStructure = {
  3: ['A', 'E', 'I', 'O', 'U']
};

// function oldScrabbleScorer(word) {
// 	word = word.toUpperCase();
// 	let letterPoints = "";
 
// 	for (let i = 0; i < word.length; i++) {
 
// 	  for (const pointValue in oldPointStructure) {
 
// 		 if (oldPointStructure[pointValue].includes(word[i])) {
// 			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
// 		 }
 
// 	  }
// 	}
// 	return letterPoints;
//  }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userWord = "";

function initialPrompt() {
  //  console.log(`Let's play some scrabble! 
   
  //  Enter a word to score: `);
   userWord = input.question(`Let's play some scrabble! 
   
Enter a word to score: `);

//   console.log(oldScrabbleScorer(userWord));
   return userWord;

};

// individual scoring algorithms (apparently must be functions?)
function simpleScore(word) {
  return String(word).length;
};

function vowelBonusScore(word) {
  word = String(word).toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in vowelPointStructure) {
      if (vowelPointStructure[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      } else {
        letterPoints += 1;
      }
    }
  }  
  return Number(letterPoints);
};

function scrabbleScore(word) {
  word = String(word).toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (const letter in newPointStructure) {
    if (letter === word[i]) {
      letterPoints += Number(newPointStructure[letter]);
      }
    }
  }
  return Number(letterPoints);
};

let scoringAlgorithms = [
  {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScore
  },
  {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
  },
  {
  name: "Scrabble",
  descriptions: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScore
  }
];


function scorerPrompt(num) {
  let scorerChoice = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);
  let i = scorerChoice;
  console.log(`Score for '${userWord}': ` + scoringAlgorithms[i].scoringFunction(userWord));
  return scoringAlgorithms[i].scoringFunction(userWord);
};

// Write the rest of the transform() function. It will need to take an object as a parameter - specifically the oldPointStructure object. Calling transform(oldPointStructure) will return an object with lowercase letters as keys. The value for each key will be the points assigned to that letter.

// using new array of points to iterate through
// for Tuesday - need to figure out why undefined is showing up after "T" so we can convert to lower case
function transform(obj) {
  let transformedPointStructure = {};
  //let newPoints = [1, 2, 3, 4, 5, 8, 10]
   //for (let i = 0; i < newPoints.length; i++) {
    for (point in obj) {
      //console.log(obj[point]);
      for (let i = 0; i < obj[point].length; i++) {
        let newKey = obj[point][i];
        //obj[newPoints[i]][j];
          newKey = newKey.toLowerCase();
          //console.log(newKey);
          let newProperty = point;
           transformedPointStructure[newKey] = Number(newProperty);
          }
        }
      //}
    //console.log(transformedPointStructure);
    return transformedPointStructure;
  };
//transform(oldPointStructure);

// using for loop to create alphabet
  // function transform(obj) {
  // let transformedPointStructure = {};
  //  for (let i = 0; i < 27; i++) {
  //   for (point in oldPointStructure) {
  //       let newKey = (i+10).toString(36);
  //       let newProperty = oldPointStructure.keys(i);
  //       transformedPointStructure[newKey] = Number(newProperty);
  //     }
  //   }
  //   console.log(transformedPointStructure);
  //   return transformedPointStructure;
  // };

      // if (oldPointStructure[pointValue].includes(word[i])) {

// add new key pairs: objectName["new-key"] = propertyValue;


let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();

}

// Console 
//console.log(oldScrabbleScorer(userWord));


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

