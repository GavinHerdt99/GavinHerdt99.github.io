/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()

  const KEYS = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40
  }

  var p1ScoreVar = 0;
  var p2ScoreVar = 0;

  var winner;

  //Factory Function for gameItem objects
  function gameItem(id) {
    var object = {}
    object.id = id
    object.x = parseFloat($(id).css("left"))
    object.y = parseFloat($(id).css("top"))
    object.width = $(id).width()
    object.height = $(id).height()
    object.speedX = 0
    object.speedY = 0
    return object
}
  
  // Game Item Objects

  var p1PaddleObj = gameItem('#p1Paddle')

  var p2PaddleObj = gameItem('#p2Paddle')

  var ballObj = gameItem('#ball')

  //Key pressing functionality
  $(document).on("keydown", handleKeyDown)
  $(document).on("keyup", handleKeyUp)

  function handleKeyDown(event) {
    if (event.which === KEYS.W) {
        p1PaddleObj.speedY = -5
    }
    if (event.which === KEYS.S) {
        p1PaddleObj.speedY = 5
    }
    if (event.which === KEYS.UP) {
        p2PaddleObj.speedY = -5
    }
    if (event.which === KEYS.DOWN) {
        p2PaddleObj.speedY = 5
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEYS.W) {
        p1PaddleObj.speedY += 5
    }
    if (event.which === KEYS.S) {
        p1PaddleObj.speedY -= 5
    }
    if (event.which === KEYS.UP) {
        p2PaddleObj.speedY += 5
    }
    if (event.which === KEYS.DOWN) {
        p2PaddleObj.speedY -= 5
    }
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  startBall()

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {    
    p1PaddleObj.y += p1PaddleObj.speedY
    p2PaddleObj.y += p2PaddleObj.speedY
    if (p1PaddleObj.y < 0) {
        p1PaddleObj.y = 0
    }
    else if (p1PaddleObj.y > BOARD_HEIGHT - p1PaddleObj.height) {
        p1PaddleObj.y = BOARD_HEIGHT - p1PaddleObj.height
    }
    if (p2PaddleObj.y < 0) {
        p2PaddleObj.y = 0
    }
    else if (p2PaddleObj.y > BOARD_HEIGHT - p2PaddleObj.height) {
        p2PaddleObj.y = BOARD_HEIGHT - p2PaddleObj.height
    }

    $(p1PaddleObj.id).css("top", p1PaddleObj.y)
    $(p2PaddleObj.id).css("top", p2PaddleObj.y)

    ballObj.x += ballObj.speedX
    ballObj.y += ballObj.speedY

    if (ballObj.y < 0) {
        ballObj.speedY *= -1
    }
    else if (ballObj.y > BOARD_HEIGHT - ballObj.height) {
        ballObj.speedY *= -1
    }

    if (ballObj.x < 0) {
        p2ScoreVar += 1
        ballObj.x = 212.5
        ballObj.y = 212.5
        startBall()
    }
    else if (ballObj.x > BOARD_WIDTH - ballObj.width) {
        p1ScoreVar += 1
        ballObj.x = 212.5
        ballObj.y = 212.5
        startBall()
    }

    if (doCollide(p1PaddleObj, ballObj)) {
        ballObj.speedX *= -1
        ballObj.speedX += .25
    }
    if (doCollide(p2PaddleObj, ballObj)) {
        ballObj.speedX *= -1
        ballObj.speedX -= .25
    }

    $(ballObj.id).css("top", ballObj.y)
    $(ballObj.id).css("left", ballObj.x)

    $("#p1Score").text(p1ScoreVar)
    $("#p2Score").text(p2ScoreVar)

    if (p1ScoreVar >= 7){
        winner = "Player 1"
        endGame()
    }
    if (p2ScoreVar >= 7){
        winner = "Player 2"
        endGame()
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall() {
    ballObj.speedX = (Math.random() * 0 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ballObj.speedY = (Math.random() * 0 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function doCollide(paddle, ball) {
    if (((paddle.x < ball.x + ball.width) && (paddle.x + paddle.width > ball.x)) && ((paddle.y < ball.y + ball.height) && (paddle.y + paddle.height > ball.y))) {
        return true
    }
    else {
        return false
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    //alerts players who won and tells them to refresh
    alert(`${winner} Won!!!\nRefresh Page to Play Again!!!`)
  }
  
}