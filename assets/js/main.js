// User-facing ariables to track
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guessesMade = [];

// Array of psychicLetter possibilities
var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Random letter generator (thanks to Rock Paper Scissors activity for this bit of code!)
var psychicLetter = computerChoices[Math.floor(Math.random() * computerChoices.length)];

/* Begin functions to call in Game Loop below: */

// Updates "Guesses left: " in html
function updateGuessesLeft() {
    document.getElementById("guesses-left").innerHTML = "Guesses Left: " + guessesLeft;
}

// Updates "Guesses Made: " in html
function updateGuessesMade() {
    document.getElementById("guesses-made").innerHTML = "Guesses Made: " + guessesMade.join(" ");
}

// Updates "Wins: " in html
function updateWins() {
    document.getElementById("wins").innerHTML = "Wins: " + wins;
}

// Updates "Losses: " in html
function updateLosses() {
    document.getElementById("losses").innerHTML = "Losses: " + losses;
}

// New psychicLetter after win or loss
function updatePsychicLetter() {
    psychicLetter = computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

// newGame() resets guessesLeft, guessesMade[] clears when next game starts
var newGame = function () {
    guessesLeft = 9;
    guessesMade = [];
    updatePsychicLetter();
    updateGuessesLeft();
}

/* End functions to call in Game Loop  */


/* Game Loop */

document.onkeyup = function (event) {
    var playerGuess = event.key;

    // validate & duplicate store value of .includes() method for boolean verification below
    var validate = computerChoices.includes(playerGuess);
    var duplicate = guessesMade.includes(playerGuess);

    // Verify that playerGuess is a lowercase letter and not a duplicate
    if (duplicate == true) {
        alert("It is still not that letter...");
    }
    else if (validate == false) {
        alert("Only lowercase letters, please. No numbers or symbols.");

        // playerGuess is a valid input but not correct. Decrements guessesLeft, pushes it to guessesMade[]
    } else if (validate === true) {
        guessesLeft--;
        guessesMade.push(playerGuess);
        updateGuessesLeft();
        updateGuessesMade();

        // Correct guess! Increments wins, alerts player, calls newGame()
        if (guessesLeft > 0) {
            if (playerGuess == psychicLetter) {
                wins++;
                updateWins();
                alert("Yes, " + playerGuess + " is the correct letter. Are you really psychic?? Press your next guess to prove it again!");
                newGame();
            }

            // Out of guesses. Increments losses, decrements guessesLeft, alerts player, calls newGame()
        } else if (guessesLeft == 0) {
            losses++;
            guessesLeft--;
            updateLosses();
            alert("Nope, I was thinking the letter '" + psychicLetter + "'. You are not psychic. Press your next guess to try to prove it again!");
            newGame();
        }
    }

}