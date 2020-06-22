document.addEventListener('DOMContentLoaded', () => {
    /*
     * Variables & Constants 
     */

    // playfield
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div')) // Cast to array, because otherwise .splice further down won't work
    const width = 10
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    let currentPosition = 4
    let currentRotation = 0
    let timerId = null
    let score = 0
    
    // preview window
    const squaresPreview = document.querySelectorAll('.mini-grid div')
    const widthPreview = 4
    let indexPreview = 0
    
    // fixed class names
    const tetrominoClassName = 'tetromino'
    const takenClassName = 'taken'
    
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
        
    // Select Tetromino
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let nextRandom = 0;
    let current = theTetrominoes[random][currentRotation]
    
    /*
    * Functions playfield
    */

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

    // start & pause button functionality
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000) // 1000 == 1000ms == 1s
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayShape()
        }
    })
    
    // Assign key strokes to function calls
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    // Function to move down
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    // Function to rotate
    function rotate() {
        undraw()
        currentRotation ++
        if (currentRotation == current.length){
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    // move the Tetramino left until it is at the left edge
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtLeftEdge) currentPosition -= 1

        if (current.some(index => squares[currentPosition + index].classList.contains(takenClassName))){
            currentPosition += 1
        }

        draw()
    }

    // move the Tetramino right until it is at the right edge
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if (!isAtRightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains(takenClassName))){
            currentPosition -= 1
        }

        draw()
    }

    // Freeze function => if space is taken e.g. at the end of the display
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains(takenClassName))) {
            current.forEach(index => squares[currentPosition + index].classList.add(takenClassName))
            // start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    // add score
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove(tetrominoClassName)
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // game over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            clearInterval(timerId)
            alert("Game Over \nYour points " + score)
        }
    }

    /*
     * Functions preview
     */

    // Tetrominoes without rotation
    const upNextTetrominoes = [
        [1, widthPreview+1, widthPreview*2+1, 2], // L Tetromino
        [0,widthPreview,widthPreview+1,widthPreview*2+1], // Z Tetromino
        [1,widthPreview,widthPreview+1,widthPreview+2], // T Tetromino
        [0,1,widthPreview,widthPreview+1], // O Tetromino
        [1,widthPreview+1,widthPreview*2+1,widthPreview*3+1] // I Tetromino
    ]

    // display in the preview window
    function displayShape() {
        // remove traces of Tetrominoes from preview window
        squaresPreview.forEach(square => {
            square.classList.remove(tetrominoClassName)
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            squaresPreview[indexPreview + index].classList.add(tetrominoClassName)
        })
    }

})
