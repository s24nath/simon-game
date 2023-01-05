/********* Global Variable Declaration Starts *********/
let colorOrdersByNum = [];
let tapCount = 0;
let turnCount = 0;
let selectionMode = false;
/********* Global Variable Declaration Ends *********/

/********* Fetching DOM elements Starts *********/
let greenButton = document.querySelector("#green-btn");
let redButton = document.querySelector("#red-btn");
let blueButton = document.querySelector("#blue-btn");
let yellowButton = document.querySelector("#yellow-btn");
let counterBoard = document.querySelector("#count");
/********* Fetching DOM elements Ends *********/

/********* Function Definition Starts *********/
const resettingVariables = () => {
  colorOrdersByNum = [];
  turnCount = 0;
  selectionMode = false;
};

const resetColors = () => {
  greenButton.style.backgroundColor = "#027802";
  redButton.style.backgroundColor = "#950303";
  blueButton.style.backgroundColor = "#01018a";
  yellowButton.style.backgroundColor = "#919102";
};

const flashingColors = (colorNumber, currentColorIteration) => {
  /* 
    1 = GREEN
    2 = RED
    3 = BLUE
    4 = YELLOW 
   */
  switch (colorNumber) {
    case 1:
      greenButton.style.backgroundColor = "lightgreen";
      break;
    case 2:
      redButton.style.backgroundColor = "tomato";
      break;
    case 3:
      blueButton.style.backgroundColor = "lightskyblue";
      break;
    case 4:
      yellowButton.style.backgroundColor = "yellow";
      break;
  }
  setTimeout(() => {
    resetColors();
    userTurn(currentColorIteration);
  }, 300);
};

const userTurn = (currentColorIteration) => {
  if (colorOrdersByNum.length - 1 === currentColorIteration) {
    selectionMode = true;
    counterBoard.textContent = turnCount;
  }
};

const computerTurn = () => {
  selectionMode = false;
  tapCount = 0;
  counterBoard.textContent = "WAIT!";
  let generateRandomNumber = Math.floor(Math.random() * 4) + 1;
  colorOrdersByNum.push(generateRandomNumber);
  colorOrdersByNum.forEach((currentFlash, index) => {
    setTimeout(() => {
      flashingColors(currentFlash, index);
    }, 800 * (index + 1) + 300);
  });
};

const checkUserSelection = (selectedColor) => {
  if (selectionMode) {
    if (selectedColor === colorOrdersByNum[tapCount]) {
      tapCount++;
      if (tapCount === colorOrdersByNum.length) {
        turnCount++;
        counterBoard.textContent = turnCount;
        computerTurn();
      }
    } else {
      counterBoard.textContent = "NO!";
      console.log(colorOrdersByNum);
    }
  }
};

const startGame = () => {
  resettingVariables();
  computerTurn();
};
/********* Function Definition Ends *********/

/********* Connecting Event-Listner to HTML Elements Starts *********/
greenButton.addEventListener("click", () => checkUserSelection(1));
redButton.addEventListener("click", () => checkUserSelection(2));
blueButton.addEventListener("click", () => checkUserSelection(3));
yellowButton.addEventListener("click", () => checkUserSelection(4));
/********* Connecting Event-Listner to HTML Elements Ends *********/
startGame();
