/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  A: 65,
  S: 83,
  D: 68
}

var posX = 290;
var posY = 290;
var speedX = 0;
var speedY = 0;

var posX2 = 100;
var posY2 = 100;
var speedX2 = 0;
var speedY2 = 0;

var height = 50
var width = 50
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  var square1 = {}
  var square2 = {}
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  var tagBeginner = Math.random()
  if (tagBeginner < .5) {
    $("#walker").attr("class", "tagged")
    $("#walker2").attr("class", "not-tagged")
  }
  else if (tagBeginner >= .5){
    $("#walker2").attr("class", "tagged")
    $("#walker").attr("class", "not-tagged")
  }

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()

    if (posX < 0) {
      posX = 390
    }
    if (posX > 390) {
      posX = 0
    }
    if (posY < 0) {
      posY = 390
    }
    if (posY > 390) {
      posY = 0
    }
    if (posX2 < 0) {
      posX2 = 390
    }
    if (posX2 > 390) {
      posX2 = 0
    }
    if (posY2 < 0) {
      posY2 = 390
    }
    if (posY2 > 390) {
      posY2 = 0
    }

    $(".tagged").css("background", "red")
    $(".not-tagged").css("background", "lime")
    $("#tag-indicator").appendTo(".tagged")

    square1.left = posX
    square1.right = posX + width
    square1.top = posY
    square1.bottom = posY + height
    square2.left = posX2
    square2.right = posX2 + width
    square2.top = posY2
    square2.bottom = posY2 + height

    if (((square1.left < square2.right) && (square1.right > square2.left)) && ((square1.top < square2.bottom) && (square1.bottom > square2.top))) {
      $(".not-tagged").attr("class", "tagging")
      $(".not-tagged").removeAttr("class", "not-tagged")
      $(".tagged").attr("class", "not-tagged")
      $(".tagged").removeAttr("class", "tagged")
      $(".tagging").attr("class", "tagged")
      $(".tagging").removeAttr("class", "tagging")
      if(square1.left < square2.left) {
        posX -= 50
        posX2 += 50
      }
      else if(square1.right > square2.right) {
        posX += 50
        posX2 -= 50
      }
      if(square1.top < square2.top) {
        posY -= 50
        posY2 += 50
      }
      else if(square1.bottom > square2.bottom) {
        posY += 50
        posY2 -= 50
      }
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      speedX = -5
    }
    if (event.which === KEY.UP) {
      speedY = -5
    }
    if (event.which === KEY.RIGHT) {
      speedX = 5
    }
    if (event.which === KEY.DOWN) {
      speedY = 5
    }
    if (event.which === KEY.A) {
      speedX2 = -5
    }
    if (event.which === KEY.W) {
      speedY2 = -5
    }
    if (event.which === KEY.D) {
      speedX2 = 5
    }
    if (event.which === KEY.S) {
      speedY2 = 5
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      speedX += 5
    }
    if (event.which === KEY.UP) {
      speedY += 5
    }
    if (event.which === KEY.RIGHT) {
      speedX -= 5
    }
    if (event.which === KEY.DOWN) {
      speedY -= 5
    }
    if (event.which === KEY.A) {
      speedX2 += 5
    }
    if (event.which === KEY.W) {
      speedY2 += 5
    }
    if (event.which === KEY.D) {
      speedX2 -= 5
    }
    if (event.which === KEY.S) {
      speedY2 -= 5
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    posX += speedX
    posY += speedY
    posX2 += speedX2
    posY2 += speedY2
  }
  
  function redrawGameItem() {
    $("#walker").css("left", posX);
    $("#walker").css("top", posY);
    $("#walker2").css("left", posX2);
    $("#walker2").css("top", posY2);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
