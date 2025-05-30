var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

function nextSequence(){
  var n=Math.random()*3;
  var randomNumber=Math.round(n);

  var randomChosenColour=buttonColours[randomNumber];

  var id="#"+ randomChosenColour;
  $(id).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);

  level=level+1;
  $("h1").text("Level "+level);

}


$('div[type="button"]').click(function(){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  switch(name){
    case "blue":
      var blue= new Audio("sounds/blue.mp3");
      blue.play();


      case "green":
          var green= new Audio("sounds/green.mp3");
          green.play();

      case "red":
        var red= new Audio("sounds/red.mp3");
        red.play();


      case "yellow":
        var yellow= new Audio("sounds/yellow.mp3");
        yellow.play();

    
  }
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

var level=0;
var started= false;
$(document).keypress(function(){
  if (!started){
    nextSequence();
    started= true;
  }

  $("h1").text("Level "+level);

});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern=[];
      },1000);
    }
  }
  else{
    console.log("wrong");
    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
  userClickedPattern=[];
}
