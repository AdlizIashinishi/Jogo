
var buttonColours = ["vermelho", "azul", "verde", "amarelo"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".botao").click(function() {

  var corEscolhidaUsuario = $(this).attr("id");
  userClickedPattern.push(corEscolhidaUsuario);

  animatePress(corEscolhidaUsuario);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
	{
      if (userClickedPattern.length === gamePattern.length)
	  {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
	else 
	{
      mensagem("errou");
      $("body").addClass("game-over");
      $("#level-title").text("Fim do jogo! Aperte um botão para reiniciar");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function mensagem(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
