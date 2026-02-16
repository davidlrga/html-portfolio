var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var randomNumber;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  $("h1").text("Level " + level);
  playSound(randomChosenColour);
  level++;
  return randomNumber
}

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length - 1));
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setInterval(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

$(document).one("keypress", function(){
  nextSequence();
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && currentLevel === (gamePattern.length - 1)){
    console.log("Success game completed");
    setTimeout(function(){
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  } else if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
  } else {
    $("body").addClass("game-over");
    setInterval(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  randomNumber = 0
}
