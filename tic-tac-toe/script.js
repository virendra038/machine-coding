/*----- constants -----*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/

let board;
let turn = 'X';
let win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');

/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleTurn);

document.getElementById('reset-button').addEventListener('click', init);

/*----- functions -----*/

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    render();
};
//be sure to call the init function!
init();

function render() {
    board.forEach(function(mark, index) {
        //this sets the text content of the square of the same position to the mark on the board. 
        squares[index].textContent = mark;
    });
};


function handleTurn(event) {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    // new code below
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    if (win === 'T') {
        messages.textContent = `That's a tie, queen!`
    } else if (win) {
        messages.textContent = `${win} wins the game!`
    } else {
        messages.textContent = `It's ${turn}'s turn!`
    }
    render();
};

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
    });
    console.log(winner);
    return winner ? winner : board.includes('') ? null : 'T';
};