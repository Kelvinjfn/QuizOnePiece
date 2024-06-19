const questions = [
    {
        question: "Quem foi o primeiro a entrar no Bando?",
        answers: [
            {text: "Sanji", correct: false},
            {text: "Nami", correct: false},
            {text: "Robin", correct: false},
            {text: "Zoro", correct: true},
        ]
    },
    {
        question: "Quem come uma Akuma no Mi não pode?",
        answers: [
            {text: "Nadar", correct: true},
            {text: "Voar", correct: false},
            {text: "Correr", correct: false},
            {text: "Saltar", correct: false},
        ]
    },
    {
        question: "Qual a comida preferida do Luffy?",
        answers: [
            {text: "Macarrão", correct: false},
            {text: "Frango", correct: false},
            {text: "Carne", correct: true},
            {text: "Sopa", correct: false},
        ]
    },
    {
        question: "Qual o nome do Pai de Luffy?",
        answers: [
            {text: "Roger", correct: false},
            {text: "Dragon", correct: true},
            {text: "Garp", correct: false},
            {text: "Shanks", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
