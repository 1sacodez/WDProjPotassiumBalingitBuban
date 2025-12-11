const questions = [
  {
    text: "What is Bella's favorite color?",
    answers: [
      { text: "Pink", correct: false },
      { text: "Purple", correct: false },
      { text: "Blue", correct: true },
      { text: "Black", correct: false }
    ]
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const timeEl = document.getElementById("time");
const scoreDisplay = document.getElementById("score-display");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
  score = 0;
  currentQuestion = 0;
  scoreDisplay.style.display = "none";
  restartBtn.style.display = "none";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.text;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.onclick = () => selectAnswer(ans.correct);
    answersEl.appendChild(btn);
  });

  timeLeft = 15;
  timeEl.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    feedbackEl.textContent = "Time's up!";
    feedbackEl.className = "feedback-message incorrect";
    endQuiz();
  }
}

function selectAnswer(correct) {
  clearInterval(timer);
  if (correct) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.className = "feedback-message correct";
    score++;
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.className = "feedback-message incorrect";
  }
  endQuiz();
}

function endQuiz() {
  scoreDisplay.style.display = "block";
  scoreEl.textContent = score + "/" + questions.length;
  restartBtn.style.display = "inline-block";
}

restartBtn.onclick = startQuiz;

startQuiz();
