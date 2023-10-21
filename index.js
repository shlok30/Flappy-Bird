import {bird,gameContainer,gravity,birdJumpHeight,gameContainerHeight,floorHeight,skyHeight,birdWidth,gameContainerWidth,score,gameOverMessage} from "./constants.js"

let gameIntervalId
let generatePipesIntervalId
let isGameOver = false

let currentBirdPosition = parseInt(getComputedStyle(bird)?.top,10)

function makeBirdJump(){
    currentBirdPosition -= birdJumpHeight
    console.log("From Jump",currentBirdPosition)
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

function isPipeInCollisionRange(topPipe,currentPipePosition){
    if(currentPipePosition === gameContainerWidth/2 + birdWidth/2) 
        console.log("Debug")
    return (currentPipePosition <= gameContainerWidth/2 + birdWidth/2) && (currentPipePosition >= (gameContainerWidth/2 - birdWidth/2 - parseInt(getComputedStyle(topPipe)?.width,10)))
}

function isBirdInCollisionRange(topPipe,bottomPipe){
    currentBirdPosition = parseInt(getComputedStyle(bird)?.top,10)
    const curentBirdBottomPosition = gameContainerHeight - currentBirdPosition - floorHeight - birdWidth //Subtracting floor height as well because bird is absolute to the container, also subtracting birdHeight(same as width) since we need position wrt bottom edge of bird
    const topPipeHeight = parseInt(getComputedStyle(topPipe)?.height,10)
    const bottomPipeHeight = parseInt(getComputedStyle(bottomPipe)?.height,10)
    console.log(topPipeHeight,currentBirdPosition)
    return currentBirdPosition <= topPipeHeight || curentBirdBottomPosition <= bottomPipeHeight
}

function birdTouchedGround(){
    currentBirdPosition = parseInt(getComputedStyle(bird)?.top,10)
    return currentBirdPosition >= skyHeight - birdWidth
}
function generatePipes(){
    const topPipe = document.createElement("div")
    const bottomPipe = document.createElement("div")
    topPipe.classList.add("pipe","top-pipe")
    bottomPipe.classList.add("pipe","bottom-pipe")
    assignHeightToPipe([topPipe,bottomPipe])
    gameContainer.append(topPipe,bottomPipe)
    let successfullyPassedObstacle = false
    function movePipes(){
        if(isGameOver) clearInterval(timerId)
        const currentPipePosition = parseInt(getComputedStyle(topPipe)?.left,10)
        topPipe.style.left = (currentPipePosition - 10) + "px"
        bottomPipe.style.left = (currentPipePosition - 10) + "px"
        if(isPipeInCollisionRange(topPipe,parseInt(topPipe.style.left,10)) && isBirdInCollisionRange(topPipe,bottomPipe) || birdTouchedGround()) endGame()
        if(!successfullyPassedObstacle && parseInt(topPipe.style.left,10) < gameContainerWidth/2 - birdWidth/2 - parseInt(getComputedStyle(topPipe)?.width,10) ){
            successfullyPassedObstacle = true
            score.textContent = parseInt(score.textContent,10) + 1
        }
        if(topPipe.style.left === "-30px"){
            gameContainer.removeChild(topPipe)
            gameContainer.removeChild(bottomPipe)
            clearInterval(timerId)
        }
    }
    let timerId = setInterval(movePipes,50)
}

function endGame(){
    isGameOver =  true
    clearInterval(gameIntervalId)
    clearInterval(generatePipesIntervalId)
    document.removeEventListener("keyup",makeBirdJump)
    gameOverMessage.style.display = "block"
}

function mainGame(){
    gameIntervalId = setInterval(startGame,50)
    generatePipesIntervalId = setInterval(generatePipes,1500)
}

mainGame()




