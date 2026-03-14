let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let playAgainBtn = document.querySelector("#playAgainBtn");
let status = document.querySelector("#status");
 
let turnX = true; 
let count = 0;  
let gameOver = false;
 
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;
 
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
 
        if (gameOver) return;
 
        if (turnX) {
            box.innerText = "X";
            box.style.color = "#a0c4ff";
            turnX = false;
            status.innerText = "Player O's turn";
        } else {
            box.innerText = "O";
            box.style.color = "#ff9fb2";
            turnX = true;
            status.innerText = "Player X's turn";
        }
 
        box.disabled = true;
        count++;
 
        let isWinner = checkWinner();
 
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
 
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;
 
        if (a != "" && b != "" && c != "") {
            if (a === b && b === c) {
                showWinner(a, pattern);
                return true;
            }
        }
    }
};
 
const showWinner = (winner, pattern) => {
    boxes[pattern[0]].style.backgroundColor = "#0f3460";
    boxes[pattern[0]].style.borderColor = "#a0c4ff";
    boxes[pattern[1]].style.backgroundColor = "#0f3460";
    boxes[pattern[1]].style.borderColor = "#a0c4ff";
    boxes[pattern[2]].style.backgroundColor = "#0f3460";
    boxes[pattern[2]].style.borderColor = "#a0c4ff";
 
    status.innerText = "Player " + winner + " wins!";
    gameOver = true;
    disableBoxes();
    playAgainBtn.style.display = "inline-block";
 
    if (winner === "X") {
        scoreX++;
        document.getElementById("scoreX").innerText = scoreX;
    } else {
        scoreO++;
        document.getElementById("scoreO").innerText = scoreO;
    }
};
 
const gameDraw = () => {
    status.innerText = "It's a Draw!";
    gameOver = true;
    scoreDraw++;
    document.getElementById("scoreDraw").innerText = scoreDraw;
    playAgainBtn.style.display = "inline-block";
};
 
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
 
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
        box.style.backgroundColor = "";
        box.style.borderColor = "";
    }
};

const resetBoard = () => {
    turnX = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    status.innerText = "Player X's turn";
    playAgainBtn.style.display = "none";
};
 
const resetAll = () => {
    resetBoard();
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;
    document.getElementById("scoreX").innerText = 0;
    document.getElementById("scoreO").innerText = 0;
    document.getElementById("scoreDraw").innerText = 0;
};
 
playAgainBtn.addEventListener("click", resetBoard);
resetBtn.addEventListener("click", resetAll);