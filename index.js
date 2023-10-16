const bird = document.querySelector(".bird")
const gameContainer = document.querySelector(".game-container")

const gravity = 5

let isGameOver = false

let currentBirdPosition = parseInt(getComputedStyle(bird)?.top,10)

function makeBirdJump(){
    currentBirdPosition -= 50
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
    const curentBirdBottomPosition = 500 - currentBirdPosition - 100 //Subtracting floor height as well because bird is absolute to the container
    console.log(curentBirdBottomPosition)
    const topPipeHeight = parseInt(getComputedStyle(topPipe)?.height,10)
    const bottomPipeHeight = parseInt(getComputedStyle(bottomPipe)?.height,10)
    return currentBirdPosition <= topPipeHeight || curentBirdBottomPosition <= bottomPipeHeight
}

const movingPipesIntervals = []

function generatePipes(){
    //First trying with hardcoded heights for pipes
    //Lets remove those pipes which have left the screen
    //Now lets give these pipes random heights
    //Now lets detect collision
    //If gameOver is true then clear the generatePipes interval
    const topPipe = document.createElement("div")
    const bottomPipe = document.createElement("div")
    topPipe.classList.add("pipe","top-pipe")
    bottomPipe.classList.add("pipe","bottom-pipe")
    assignHeightToPipe([topPipe,bottomPipe])
    gameContainer.append(topPipe,bottomPipe)
    function movePipes(){ // Using closure of topPipe and bottomPipe
        //If gameOver is true then clear its interval
        if(isGameOver) clearInterval(timerId)
        const currentPipePosition = parseInt(getComputedStyle(topPipe)?.left,10)
        topPipe.style.left = (currentPipePosition - 10) + "px"
        bottomPipe.style.left = (currentPipePosition - 10) + "px"
        if(isPipeInCollisionRange(topPipe,parseInt(topPipe.style.left,10)) && isBirdInCollisionRange(topPipe,bottomPipe)) endGame()
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

gameIntervalId = setInterval(startGame,50)

generatePipesIntervalId = setInterval(generatePipes,1500)


