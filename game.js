var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

var buttonColours=["red","blue","green","yellow"];

// Pressing a key to start a game

$(document).keydown(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

// When user clicks a button

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// Function to start the game again when the player fails

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}

// Function to animate the press

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
  {
    $("#"+currentColour).removeClass("pressed");
  },100);
}

// Function to play the sound

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Function to create the sequence

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // console.log(randomChosenColour)
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Function to check whther the pattern is correct or not

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function()
      {
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("wrong");
    var audio1=new Audio("sounds/wrong.mp3");
    audio1.play();
    $("body").addClass("game-over");
    setTimeout(function()
  {
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();

  }

}
