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

    const tetrominoClassName = 'tetromino'

    console.log(grid);
    console.log(squares);
    console.log(scoreDisplay);
    console.log(startBtn);

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
    const currentPosition = 4
    const currentRotation = 0

    // Randomly select Tetromino
    const random = Math.floor(Math.random()*theTetrominoes.length)
    const current = theTetrominoes[random][currentRotation]

    // draw current tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add(tetrominoClassName)
        })
    }

    // undraw current tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove(tetrominoClassName)
        })
    }

    draw()
})
