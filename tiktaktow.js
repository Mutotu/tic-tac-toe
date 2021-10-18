// basics

const container = document.getElementById("gameContainer");
const gameTile = [];
let nextMove = "X";
var turnDisplay = document.getElementById('whos-turn');

// a function to show the results of the game, either X/O won, or it was a draw.
// it will then display the message on screen

function gameOver(message){
    document.getElementById("winner").innerHTML = message;
    container.style.display = "none";
    document.getElementById("gameOver").style.display = "block";

}

// this will check the arrays to see info inside of them, if all arrays have a value, then a draw is active
// if not all values are filled, then returna as false and the game is not a draw.

function isDraw() {
    let shouldReturn = true;
    gameTile.forEach(({ state }) => {
        if (state == "") shouldReturn = false;
    });
    return shouldReturn;
}

// all possible winning combinations are displayed first
// we compare the values in each state as [a, b, c]
// i understand on why it works, but i had trouble with the how it works
// i had help from a friend guide me through the making of this function

function wonGame() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            gameTile[a].state !== "" &&
            gameTile[a].state === gameTile[b].state &&
            gameTile[a].state === gameTile[c].state
        ) {
            return true;
        }
    }
    return false;
}

// these are the values/properties of the squares
// when a square is clicked, we remove the hover option from css by removing the class name from the <div>
// also once clicked, the next person is next to move
// we go through the loop of checking if the game is either already won, a draw, or the next persons move
// will give the results if either the game is won, or a draw

class Tile {
    constructor(element, index) {
        this.element = element;
        this.index = index;
        this.state = "";
    }
    clicked() {
        this.state = nextMove;
        this.element.classList.remove("notClicked");
        this.element.onclick = function () {
            return false;
        };
        this.element.querySelector('p').innerHTML = this.state;
        if (wonGame()) return gameOver("the winner is player " + this.state);
        if (isDraw()) return gameOver("it is a draw");
        nextMove == "X" ? (nextMove = "O") : (nextMove = "X");
    }
} 
// we create 9 <div>'s with the class of "square" and "not clicked"
// we added a notClicked for the purpose of making the hoverable option in CSS
// we add a function for when our square is clicked, it is added to our class of Tile
// it is then added to our 'container' which will add the <div> to the "gameContainer" in the html
// we then add the square to our array "gameTile"

for (let index = 0; index < 9; index++) {
    const div = document.createElement("div");
    div.classList.add("square", "notClicked")
    const square = new Tile(div, index);
        div.onclick = function () {
            square.clicked();
        }
    div.appendChild(document.createElement("p"));
    container.appendChild(div);
    gameTile.push(square);
}

// here are some links with notes that helped me with the creation of this game
// https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click -- Used this primarily to make a reset button.