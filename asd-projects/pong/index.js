/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const KEYS = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40
  }

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

  function handleKeyDown(event) {
    if (event.which === KEYS.W)
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}