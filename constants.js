const bird = document.querySelector(".bird")
const gameContainer = document.querySelector(".game-container")
const ground = document.querySelector(".ground")
const sky = document.querySelector(".sky")
const score = document.querySelector(".scoreboard span")

const gravity = 5
const birdJumpHeight = 50
const gameContainerHeight = parseInt(getComputedStyle(gameContainer)?.height,10)
const floorHeight = parseInt(getComputedStyle(ground)?.height,10)
const skyHeight = parseInt(getComputedStyle(sky)?.height,10)
const birdWidth = parseInt(getComputedStyle(bird)?.width,10)
const gameContainerWidth = parseInt(getComputedStyle(gameContainer)?.width,10)

export {bird,gameContainer,ground,sky,gravity,birdJumpHeight,gameContainerHeight,floorHeight,skyHeight,birdWidth,gameContainerWidth,score}