let timerInterval 
let seconds = 0;
let correctAnswer;
let score = 0;
let attempts = 0;
let gameActive = false;

$('#start-stop-button').click(function () {
  if ($(this).hasClass('btn-success')) {
    startGame();
  } else {
    stopGame();
  }
});

function startGame() {
  $('#start-stop-button').removeClass('btn-success').addClass('btn-danger').text('Stop Game');
  gameActive = true;
  resetGame();
  timerInterval = setInterval(function () {
    seconds++;
    $('#time-counter').text(`Time: ${seconds}`);
  }, 1000);
  generateEquation();
}

function stopGame() {
  $('#start-stop-button').removeClass('btn-danger').addClass('btn-success').text('Start New Game');
  clearInterval(timerInterval);
  gameActive = false;
}

function resetGame() {
  seconds = 0;
  score = 0;
  attempts = 0;
  $('#time-counter').text(`Time: 0`);
  updateScore();
  $('#feedback-container').empty();
  $('#button-container').empty();
  $('#equation').text('');
}

function generateEquation() {
  const num1 = generateRandomNumber();
  const num2 = generateRandomNumber();
  correctAnswer = num1 * num2;
  $('#equation').text(`${num1} * ${num2}`)
  generateAnswers();
}

function generateAnswers() {
  $('#button-container').empty();
  //Create array to hold answers and add the correct one
  const answers = [];
  answers.push(correctAnswer);
  // Add 4 answers
  while (answers.length < 5) {
    let wrongAnswer = generateRandomNumber() * generateRandomNumber();
    
    // Only add if it's not already in the array
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer);
    }
  }
  // Sorted order 
  answers.sort((a,b) => a-b);
  // Create buttons
  for (let i = 0; i < answers.length; i++) {
    const button = $(`<button class="btn btn-primary btn-lg w-100" type="button">${answers[i]}</button>`);
    button.click(function () {
      if (!gameActive) return; // Necessary to prevent game from proceeding when it is in "stopped" state

      const selectedAnswer = answers[i];
      attempts++; // always increase regardless
      if (selectedAnswer == correctAnswer) {
        $('#feedback-container').html(`<h1 class="text-center text-success">Correct!</h1>`);
        score++;
        updateScore();
        generateEquation();
      }
      else {
        const equation = $('#equation').text();
        $('#feedback-container').html(`<h1 class="text-center text-danger">Wrong. ${equation} is ${correctAnswer}.</h1>`);
        updateScore();
        generateEquation();
      }
    })
    $('#button-container').append(button);
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function updateScore() {
  $('#score-counter').text(`Score: ${score}/${attempts}`)
}
