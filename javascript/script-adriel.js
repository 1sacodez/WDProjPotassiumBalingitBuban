// questions
const quizData = [
  {
    question: "Which STEM subject is Adriel's current favorite?",
    options: ["Science", "ADTech", "Math", "Computer Science "],
    answer: "Math"
  },

  {
    question: "Which concessionaire in Pisay does Adriel like to buy from most?",
    options: ["Colai's", "Ajisakki", "Happy Tummy", "RedBox"],
    answer: "Colai's"
  },
  
  {
    question: "As a dormer, what time does Adriel usually wake up on regular school days?",
    options: ["6:30 AM", "7:00 AM", "7:10 AM", "6:00 AM"],
    answer: "7:00 AM"
  },
  
  {
    question: "What is Adriel's least favorite day of the week?",
    options: ["Sunday", "Wednesday", "Thursday", "Friday"],
    answer: "Thursday"
  },
  
  {
    question: "Where did Adriel get his iconic blue jacket from?",
    options: ["It was a gift to him from a relative", "He bought it in the mall", "It was a prize he won", "He got it from the Pisay lost and found raffle"],
    answer: "It was a prize he won"
  },
  
  {
    question: "Does Adriel have any pets? If so, how many?",
    options: ["No, he doesn't", "Yes; one", "Yes; two", "Yes; four"],
    answer: "Yes; one"
  },

  
  {
    question: "What is Adriel's primary love language?",
    options: ["Quality Time", "Gift-Giving", "Words of Affirmation", "Acts of Service"],
    answer: "Quality Time"
  },

  {
    question: "Which Pisay PE sport is Adriel's favorite so far?",
    options: ["Badminton", "Basketball", "Handball", "Frisbee"],
    answer: "Handball"
  },
  

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
  quizId: "adriel_quiz"   // <-- unique ID for this quiz/student
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