// questions
const quizData = [
  {
    question: "What is Bella's favorite animal she's seen so far in Pisay?",
    options: ["Cat", "Dog", "Goat", "Rat"],
    answer: "Cat"
  },
  
  {
    question: "What club is Bella in?",
    options: ["Math Club", "Sightlines", "Alianti", "Likha"],
    answer: "Likha"
  },
  
  {
    question: "What is Bella's favorite day of the week?",
    options: ["Saturday", "Monday", "Wednesday", "Thursday"],
    answer: "Saturday"
  },
  
  {
    question: "How many pins does Bella currently have on her ID lanyard?",
    options: ["6", "10", "7", "8"],
    answer: "8"
  },
  
  {
    question: "Among the following Pisay events from 2023 to 2026, which is Bella's favorite?",
    options: ["YMSAT", "ALAB", "Petrichor", "Haraya"],
    answer: "Haraya"
  },
  
  {
    question: "What jewelry does Bella wear least?",
    options: ["Necklaces", "Bracelets", "Earrings", "Rings"],
    answer: "Earrings"
  },

  {
    question: "Does Bella prefer colder or hotter temperature-environments?",
    options: ["Colder", "Hotter"],
    answer: "Colder"
  },

  {
    question: "What kind of dance has Bella not tried yet?",
    options: ["Ballet", "Hiphop", "Jazz", "Tap"],
    answer: " Tap"
  }
  
  
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;
const timerEl = document.getElementById('time');
const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const scoreEl = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');
let startedAt = new Date();

function readJSON(key, fallback){
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {return JSON.parse(raw);}
  catch(e){
    console.warn("Bad JSON in localStorage for key:", key, e);
    return fallback;
  }
}

function writeJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function getAttempts(){
  return readJSON("quizAttempts", []);
}

function addAttempt(attempt){
  const attempts = getAttempts();
  attempts.push(attempt);

  const trimmed = attempts.slice(-10);

  writeJSON("quizAttempts", trimmed)
}



// display questions
function showQuestion(){
  if (currentQuestion === 0 && timeLeft === 20){
    startedAt = new Date();
  }
  if (currentQuestion >= quizData.length){
    endQuiz();
    return;
  }
  clearInterval(timerInterval);
  timeLeft = 20;
  timerEl.textContent = timeLeft;
  startTimer();
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = ' ';
  currentQuiz.options.forEach (option =>{
    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsEl.appendChild(button);
  });
}

// check answers
function checkAnswer(selectedOption){
  if (selectedOption === quizData[currentQuestion].answer){
    score++;
  }
  currentQuestion++;
  showQuestion();
}

// timer
function startTimer(){
  timerInterval = setInterval (() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0){
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz(){
  clearInterval(timerInterval);
  questionEl.style.display = 'none';
  optionsEl.style.display = 'none';
  resultEl.style.display = 'block';
  scoreEl.textContent = score;
  restartBtn.style.display = 'block';

  const endedAt = new Date();
  const secondsUsed = Math.round((endedAt - startedAt) / 1000);

const user = readJSON("quizUser", null);

const attempt = {
  dateISO: endedAt.toISOString(),
  score: score,
  total: quizData.length,
  secondsUsed: secondsUsed,
  username: user ? user.name : "Guest",
  email: user ? user.email : "Unknown",
  quizId: "bella_quiz"   // <-- unique ID for this quiz/student
};

addAttempt(attempt);

}


restartBtn.addEventListener('click', () => {
  // reset data
  currentQuestion = 0;
  score = 0;
  timeLeft = 20;
  timerEl.textContent = timeLeft;
    
  // reset display
  questionEl.style.display = 'block';
  optionsEl.style.display = 'flex';
  resultEl.style.display = 'none';
  restartBtn.style.display = 'none';
  
  showQuestion();
  
  
  
});

showQuestion();