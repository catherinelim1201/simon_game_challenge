let gamePattern = [];
let userClickedPattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];

let gameStart = false;
let level = 0;

const startOver = () => {
  level = 0;
  gameStart = false;
  gamePattern = [];
  userClickedPattern = []; // Reset the userClickedPattern array
};

$(document).on("keyup", function() {
  if (!gameStart) {
    gameStart = true;
    $("#level-title").text(`Level ${level}`);
    nextSequence();
  }
});

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const nextSequence = () => {
  level += 1;
  $("#level-title").text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        userClickedPattern = []; // Reset the userClickedPattern array
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over. Press any key to restart");

    startOver();
  }
};

$(".btn").click(function() {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
