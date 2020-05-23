const lTetromino = 'firstShape'
const zTetromino = 'secondShape'
const oTetromino = 'thirdShape'
const iTetromino = 'fourthShape'
const tTetromino = 'fifthShape'

const tetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino]

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = document.querySelectorAll('.grid div');
    const width = 10;

    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')

    console.log(grid);
    console.log(squares);
    console.log(scoreDisplay);
    console.log(startBtn);
})