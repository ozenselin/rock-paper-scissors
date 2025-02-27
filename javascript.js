//creates and returns a selection object from parameters
function createSelection(name = "", index = 0, capital = ""){
    return {
        name,
        index,
        capital,
    };
}

//create and return a selection object from the selection name
function createUserSelection(name){
    let index = selections.indexOf(name);
    let capital = selectionCapitals.at(index);
    return createSelection(name, index, capital);
}

//create a random index
//create and return a selection object from that index
function createComputerSelection(){
    //create an index variable: [0,1,2]
    let index = Math.floor(Math.random() * 3);
    let name = selections.at(index);
    let capital = selectionCapitals.at(index);
    return createSelection(name, index, capital);
}


//a player object: name, selections[], currentRoundResult, score
//creates and returns a user player
function createUser(){
    return {
        name: "user",
        selections: [],
        currentRoundResult: "",
        score: 0,
    };
}
//creates and returns a computer player
function createComputer(){
    return {
        name: "computer",
        selections: [],
        currentRoundResult: "",
        score: 0,
    };
}

//takes the selection of the user
//creates and prompts selections for players
//updates scores and results accordingly
//logs the winner
function playRound(userSelectionName){
    //create player's selections
    let userSelection = createUserSelection(userSelectionName);
    let computerSelection = createComputerSelection();

    //add selections to players selection lists
    user.selections.push(userSelection);
    computer.selections.push(computerSelection);

    //update scores and round results accordingly
    switch(userSelection.name){
        case R:
            switch(computerSelection.name){
                case R:
                    user.currentRoundResult = "tie";
                    computer.currentRoundResult = "tie";
                    break;
                case P:
                    user.currentRoundResult = "lose";
                    computer.currentRoundResult = "win";
                    computer.score++;
                    break;
                case S:
                    user.currentRoundResult = "win";
                    user.score++;
                    computer.currentRoundResult = "lose";
                    break;
                default:
                    break;
            }
            break;
        case P:
            switch(computerSelection.name){
                case R:
                    user.currentRoundResult = "win";
                    user.score++;
                    computer.currentRoundResult = "lose";
                    break;
                case P:
                    user.currentRoundResult = "tie";
                    computer.currentRoundResult = "tie";
                    break;
                case S:
                    user.currentRoundResult = "lose";
                    computer.currentRoundResult = "win";
                    computer.score++;
                    break;
                default:
                    break;
            }
            break;
        case S:
            switch(computerSelection.name){
                case R:
                    user.currentRoundResult = "lose";
                    computer.currentRoundResult = "win";
                    computer.score++;
                    break;
                case P:
                    user.currentRoundResult = "win";
                    user.score++
                    computer.currentRoundResult = "lose";
                    break;
                case S:
                    user.currentRoundResult = "tie";
                    user.currentRoundResult = "tie";
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    //update scores that are in the spans
    userScoreSpan.textContent = user.score;
    computerScoreSpan.textContent = computer.score;

    if(user.score < VICTORY_TRESHOLD && computer.score < VICTORY_TRESHOLD){
        displayRoundWinner();
    }
    else{
        displayGameWinner();
    }
}

//displays the given round result message on the message board
function displayRoundWinner(){
    stopWriting();
    //clear the board
    clear();
    let message = createRoundWinnerMessage();
    //write the message on the board
    write(message, 0);

}
function createRoundWinnerMessage(){
    switch(user.currentRoundResult){
        case "win":
            message = `${user.selections.at(-1).name} beats ${computer.selections.at(-1).name}\nYou won!`;
            break;
        case "lose":
            message = `${computer.selections.at(-1).name} beats ${user.selections.at(-1).name}\nComputer won!`;
            break;
        case "tie":
            message = `${user.selections.at(-1).name} ties ${computer.selections.at(-1).name}\nA tie!`;
            break;
        default:
            break;
    }
    return message;
}

function displayGameWinner(){
    stopWriting();
    //clear the board
    clear();
    //write the winner message on it
    let message = createRoundWinnerMessage() 
            + ((user.score > computer.score) ? " You were the first to score 5! The game is over... " 
                                            : " Computer was the first to score 5! The game is over...")
            + ``;
    write(message, 0);
}

//players
let user;
let computer;

//background sound
const gameAudio = document.querySelector("#game-audio");

//initially, the game sound is on
let isSoundOn = true;

//plain div under the console image
const messageBoard = document.querySelector(".console-message-board");

//start-screen is hidden when console is appearing and visa-versa
const startScreen = document.querySelector(".start-screen");
const consoleContainer = document.querySelector(".console-container");

//green button on the start-screen
const playButton = document.querySelector(".play-button");

//leftmost buttons on the console
const dpadButtons = document.querySelectorAll(".dpad-button");

//rightmost buttons on the console
const restartButton = document.querySelector(".button-restart");
const soundButton = document.querySelector(".button-sound");

//typewriting to the message board
let timeOutId;

//message board button
const continueButton = document.querySelector("#continue");

//define minimum score to win
const VICTORY_TRESHOLD = 5;

//define available three selections
const SELECTION_1 = "rope";
const SELECTION_2 = "spatula";
const SELECTION_3 = "jellyfish";
//define capitals and their values
const R = SELECTION_1;
const P = SELECTION_2;
const S = SELECTION_3;

//store first letter capitilazied of selections
let selectionCapitals = ["R", "P", "S"];

//store full name of the selections
let selections = [SELECTION_1, SELECTION_2, SELECTION_3];

//messages to display on the board
const GREETING_1 = `In the heart of Bikini Bottom, where the tides whisper secrets, Plankton unveils a cunning challange...`;
const GREETING_2 = `Rock, Paper, Scissors, but with a twist that could change everything!`;
const GREETING_3 = `There's a scheme lurking beneath that tiny frame`;
const GREETING_4 = `This isn't just a game.. It's a trap in disguise`;
const GREETING_5 = `Stay sharp..`;
const GREETING_6 = `Behind every move lies a trick, and Plankton never plays fair`
const INSTRUCTION_1 = 
    `- Rope beats jellyfish
    - Jellyfish beats spatula
    - Spatula beats rope...`;
const INSTRUCTION_2 = `The battle will start in a second now.. Remember, first one to score 5 wins! Good luck & Have fun!`;

//store messages
const messages = [GREETING_1, GREETING_2, GREETING_3, GREETING_4, GREETING_5, INSTRUCTION_1, INSTRUCTION_2];

//store which message is displayed
let currentMessageIndex = 0;

//miliseconds
TIMEOUT = 30;

//player scores are stored in spans
const userScoreSpan = document.querySelector("#score-user");
const computerScoreSpan = document.querySelector("#score-computer");

//takes a string and a starting index
function write(message, index) {
    //if index does not depass the lenght of the message
    if(index < message.length){
        //get the current character
        let currentChar = message.charAt(index); 

        //put it in messageBoard
        messageBoard.textContent += currentChar;

        //wait for 100ms and call the same function for the next index
        timeOutId = setTimeout(function () {
            write(message, index + 1);
        }, TIMEOUT);
    }
}

//when the play button is clicked
// Function to stop writing
function stopWriting() {
    clearTimeout(timeOutId); // Stops the scheduled function
}

//empties board
function clear(){
    //stop the function if it's writing
    stopWriting();
    //clear the board
    messageBoard.textContent = "";
}

function displayNextMessage(event){
    switch(currentMessageIndex){
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            stopWriting();
            clear();
            write(messages.at(currentMessageIndex), 0);
            currentMessageIndex++;
            break;
        case 6: //this is the last message that annouces the game is starting shortly after
            //prevent displaying one more message
            continueButton.removeEventListener("click", displayNextMessage);
            //remove highlight effect
            console.log("removed hgihlight");
            continueButton.classList.remove("highlight");
            console.log("removed hgihlight");

            stopWriting();
            clear();
            currentMessageIndex++;

            //wait 2 seconds after the message loads
            setTimeout(write(messages.at(currentMessageIndex - 1), 0), TIMEOUT);

            //for each dpad button
            dpadButtons.forEach(button => {
                //listen to selection of user
                button.addEventListener("click", select);
                //make buttons clickable again
                button.disabled = false;
            });

            break;
        default:
            break;  
    }
}
/*WHEN A SELECTION BUTTON PRESSED*/
/*in the button function, 
make all buttons disabled again including the button pressed itself
if user and computer is not depassing the victory treshold
play round (user, computer)
- in play round function update createUserSelection function
- instead of prompting the user forever (remove it)
- use the button's class or id to get the selection
- and create a selection object
- and return it
- (you can console.log the event to get the propoerty you're looking for. Manipulate the html if needed)
Play round function sends its ending message itself
but atfter play round executes:
if no one is at victory treshold
make button enabled again
if someone is at victory treshold 
don'T make buttons enabled again!
instead create an game winner message and display it on the message board
after that, set those object to null to clear the memory(?) user = null, computer = null
alternetively: make the start-screen faded or opacity: 0.5 and write GAME OVER?
*/

function toggleSound() {
    isSoundOn = !isSoundOn; // Durumu tersine çevir
    
    // İkonu değiştir
    if(isSoundOn){
        gameAudio.play(); //Sesi aç
        soundButton.firstElementChild.setAttribute("src", "assets/icons/sound-on.svg");
    }
    else{
        gameAudio.pause();
        gameAudio.currentTime = 0; 
        soundButton.firstElementChild.setAttribute("src", "assets/icons/sound-off.svg");
    }
}

function select(){
    //make all buttons unclickable again
    dpadButtons.forEach(button => {
        button.disabled = false;
    });

    //if both scores are below the threshold
    if(user.score < VICTORY_TRESHOLD && computer.score < VICTORY_TRESHOLD){
        let userSelection = this.id;
        playRound(userSelection);
    }       
}

function startPlaying(){
    //prevent the user to click multiple selection buttons at a time
    dpadButtons.forEach(button => {
        //make the button invisible
        button.display = false;
    });

    //initialize players
    user = createUser();
    computer = createComputer();

    //hide the start-screen
    startScreen.classList.add("hidden");
    //display the console
    consoleContainer.classList.remove("hidden");

    //display the first message
    displayNextMessage();

    //display messages on board
    continueButton.addEventListener("click", displayNextMessage);

    //highlight to make it easier to see
    continueButton.classList.add("highlight");

    //play the sound
    gameAudio.play();

    //listen to the the sound button
    soundButton.addEventListener("click", toggleSound);
}

playButton.addEventListener("click", startPlaying);
