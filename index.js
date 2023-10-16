const bird = document.querySelector(".bird")
const gameContainer = document.querySelector(".game-container")
const ground = document.querySelector(".ground")
const sky = document.querySelector(".sky")

const gravity = 5
const birdJumpHeight = 50
const gameContainerHeight = parseInt(getComputedStyle(gameContainer)?.height,10)
const floorHeight = parseInt(getComputedStyle(ground)?.height,10)
const skyHeight = parseInt(getComputedStyle(sky)?.height,10)
const birdWidth = parseInt(getComputedStyle(bird)?.width,10)

let isGameOver = false

let currentBirdPosition = parseInt(getComputedStyle(bird)?.top,10)

function makeBirdJump(){
    currentBirdPosition -= birdJumpHeight
    bird.style.top = currentBirdPosition + "px"
}

document.addEventListener("keyup",makeBirdJump)

function startGame(){
    currentBirdPosition += gravity
    bird.style.top = currentBirdPosition + "px"
}

function assignHeightToPipe(pipes){
    pipes.forEach(pipe => {
        const height = Math.floor(Math.random() * (51) ) + 100;
        pipe.style.height = height + "px"
    })
}

function isPipeInCollisionRange(pipe,currentPipePosition){
    const gameContainerWidth = parseInt(getComputedStyle(gameContainer)?.width,10)
    const pipeWidth = parseInt(getComputedStyle(pipe)?.width,10)
    return (currentPipePosition <= gameContainerWidth/2) && (currentPipePosition >= (gameContainerWidth/2 - pipeWidth))
}

function isBirdInCollisionRange(topPipe,bottomPipe){
    const curentBirdBottomPosition = gameContainerHeight - currentBirdPosition - floorHeight //Subtracting floor height as well because bird is absolute to the container
    const topPipeHeight = parseInt(getComputedStyle(topPipe)?.height,10)
    const bottomPipeHeight = parseInt(getComputedStyle(bottomPipe)?.height,10)
    return currentBirdPosition <= topPipeHeight || curentBirdBottomPosition <= bottomPipeHeight
}

function birdTouchedGround(){
    return currentBirdPosition >= skyHeight - birdWidth
}

const movingPipesIntervals = []

function generatePipes(){
    const topPipe = document.createElement("div")
    const bottomPipe = document.createElement("div")
    topPipe.classList.add("pipe","top-pipe")
    bottomPipe.classList.add("pipe","bottom-pipe")
    assignHeightToPipe([topPipe,bottomPipe])
    gameContainer.append(topPipe,bottomPipe)
    function movePipes(){
        if(isGameOver) clearInterval(timerId)
        const currentPipePosition = parseInt(getComputedStyle(topPipe)?.left,10)
        topPipe.style.left = (currentPipePosition - 10) + "px"
        bottomPipe.style.left = (currentPipePosition - 10) + "px"
        if(isPipeInCollisionRange(topPipe,parseInt(topPipe.style.left,10)) && isBirdInCollisionRange(topPipe,bottomPipe) || birdTouchedGround()) endGame()
        if(topPipe.style.left === "-30px"){
            gameContainer.removeChild(topPipe)
            gameContainer.removeChild(bottomPipe)
            clearInterval(timerId)
        }
    }
    let timerId = setInterval(movePipes,100)
    movingPipesIntervals.push(timerId)
}

function endGame(){
    isGameOver =  true
    clearInterval(gameIntervalId)
    clearInterval(generatePipesIntervalId)
    document.removeEventListener("keyup",makeBirdJump)
}

function mainGame(){
    gameIntervalId = setInterval(startGame,50)
    generatePipesIntervalId = setInterval(generatePipes,1500)
}

mainGame()




