import {bird,gameContainer,gravity,birdJumpHeight,gameContainerHeight,floorHeight,skyHeight,birdWidth,gameContainerWidth} from "./constants.js"

let gameIntervalId
let generatePipesIntervalId
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
        const height = Math.floor(Math.random() * 11) * 5 + 100;
        pipe.style.height = height + "px"
    })
}

function isPipeInCollisionRange(_,currentPipePosition){
    if(currentPipePosition === gameContainerWidth/2 + birdWidth/2) 
        console.log("Debug")
    return (currentPipePosition <= gameContainerWidth/2 + birdWidth/2) && (currentPipePosition >= (gameContainerWidth/2 - birdWidth/2))
}

function isBirdInCollisionRange(topPipe,bottomPipe){
    const curentBirdBottomPosition = gameContainerHeight - currentBirdPosition - floorHeight - birdWidth/2 //Subtracting floor height as well because bird is absolute to the container
    const topPipeHeight = parseInt(getComputedStyle(topPipe)?.height,10)
    const bottomPipeHeight = parseInt(getComputedStyle(bottomPipe)?.height,10)
    console.log(topPipeHeight,currentBirdPosition)
    return currentBirdPosition <= topPipeHeight || curentBirdBottomPosition <= bottomPipeHeight
}

function birdTouchedGround(){
    return currentBirdPosition >= skyHeight - birdWidth
}
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




