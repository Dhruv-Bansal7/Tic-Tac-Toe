let login = document.querySelector(".login");
let startgame = document.querySelector(".start-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn = document.querySelector("#turn");

function gePlayer1name() {
    let player1name = document.querySelector("#player1");
    let value1 = player1name.value;
    return value1;
}
function gePlayer2name() {
    let player2name = document.querySelector("#player2");
    let value2 = player2name.value;
    return value2;
}

    
startgame.addEventListener('click', () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "flex";
    msgcontainer.style.display = "none";
    let value1 = gePlayer1name();
    turn.innerHTML = `${value1} turns`;
});

let newgamebtn = document.querySelector("#newgame");
let resetbtn = document.querySelector("#resetgame");
let boxes = document.querySelectorAll(".box");
let turn0 = true; //player X aur player O
let count = 0; //for draw



const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgcontainer.style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "flex";
};

const disableBox = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};


const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        let value1 = gePlayer1name();
        let value2 = gePlayer2name();
        if (turn0) {
            box.innerHTML = "O";
            turn0 = false;
            turn.innerHTML = `${value2} turns`;
        }
        else {
            box.innerHTML = "X";
            turn0 = true;
            turn.innerHTML = `${value1} turns`;
        }
        box.disabled = true;
        count++;
        let winner = checkWinner();

        if (count === 9 && !winner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerHTML = `Game was Draw.`;
    msgcontainer.style.display = "flex";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "none";
    disableBox();
}

const showWinner = (winner) => {
    let value1 = gePlayer1name();
    let value2 = gePlayer2name();
    msg.innerHTML = `Congratulations , Winner is ${value1}`;
    msgcontainer.style.display = "flex";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "none";
    disableBox();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};

newgamebtn.addEventListener("click" , resetGame);
resetbtn.addEventListener("click" , resetGame);


