//varaibles from html
const resetbt = document.getElementById("reset");
const squares = document.getElementsByClassName("square");
const result = document.getElementById("result");
const winCounter = document.getElementById("win-counter");
const turn = document.getElementById("turn");
const resetScore = document.getElementById("reset-score");
//player to determine 'X' or 'Y' to be assigned to playerID
var player = true;
let playerID = "";
let winner = false;
//collector to store the values and compare them
let collector = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
//adding the number of wins of each player
const playerWins = { X: 0, O: 0 };
function threeTimesWinner() {
  if (playerWins.X === 3) {
    result.innerHTML = "<strong>X</strong> wins three rounds";
  }
  if (playerWins.O === 3) {
    result.innerHTML = "<strong>Y</strong> wins three rounds";
  }
}
//Counts the number of zeros to determine if it is a tie!
function noWinner() {
  let counterZeros = 0;
  for (let i of collector) {
    for (let j of i) {
      if (j !== 0) {
        counterZeros++;
      }
    }
  }
  if (counterZeros === 9) {
    result.innerText = "Its a tie";
  }
}
//to reset the page
function clear() {
  for (let i of squares) {
    i.textContent = null;
  }
  result.textContent = null;
  disableClick();
  collector = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  winner = false;
}
resetbt.addEventListener("click", clear);

//After the result disable the blocks not to be clicked
function disableClick() {
  for (let i = 0; i < squares.length; i++) {
    document.getElementById(`${i}`).removeAttribute("disabled");
    // console.log("disableddddddddddd");
  }
}

//resetscores
resetScore.addEventListener("click", function () {
  clear();
  winCounter.innerText = null;
  playerWins.X = 0;
  playerWins.O = 0;
  threeTimesWinner();
});

function play() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      //Ids have numerical values so each id gets assinged tp positon
      let position = squares[i].getAttribute("id");
      if (player) {
        playerID = "X";
        turn.textContent = "O's move";
      } else {
        playerID = "O";
        turn.textContent = "X's move";
      }
      squares[i].textContent = playerID;

      document.getElementById(position).setAttribute("disabled", true);
      //to swich back players
      player = !player;

      addToCollector(position, playerID);

      checkWinner(playerID);

      printWinnerCounter();
      noWinner();
      threeTimesWinner();
    });
  }
}

play();

function addToCollector(position, value) {
  let num = parseInt(position);
  let row = parseInt(num / 3);
  let col = num % 3;
  collector[row][col] = value;
}

//evaluate if same values positioned at the designated order to
function checkWinner(value) {
  for (let i = 0; i < collector.length; i++) {
    if (
      collector[i][0] === value &&
      collector[i][1] === value &&
      collector[i][2] === value
    ) {
      winner = true;
    } else if (
      collector[0][i] === value &&
      collector[1][i] === value &&
      collector[2][i] === value
    ) {
      winner = true;
    }

    if (
      collector[0][0] === value &&
      collector[1][1] === value &&
      collector[2][2] === value
    ) {
      winner = true;
    }
    if (
      collector[2][0] === value &&
      collector[1][1] === value &&
      collector[0][2] === value
    ) {
      winner = true;
    }
  }
  if (winner) {
    result.innerText = `The winner of this round is ${value}`;
  }

  //if winner is true then disable the rest of the blocks
  for (let i = 0; i < squares.length; i++) {
    if (winner) {
      document.getElementById(`${i}`).setAttribute("disabled", true);
    }
  }
  //add the nubmer of wins to playerWins variable
  if (value === "X" && winner) playerWins.X++;
  if (value === "O" && winner) playerWins.O++;
}

//keeps score of each player
function printWinnerCounter() {
  winCounter.innerHTML = `Player  <strong> X</strong>: ${playerWins.X} <=> Player  <strong> O</strong>: ${playerWins.O}`;
}
//testing if it places the right values to collector
function printMatrix() {
  for (let i = 0; i < collector.length; i++) {
    for (let j = 0; j < collector.length; j++) {
      console.log(collector[i][j]);
    }
  }
}
