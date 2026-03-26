const questions = [
    {
        question: "What is JavaScript?",
        answer: [
            { text: "A styling language", correct: false},
            { text: "A programming language", correct: true},
            { text: "A database", correct: false},
            { text: "An operating system", correct: false},
        ]
    },
    {
        question: "Which keyword is used to declare a variable?",
        answer: [
            { text: "var", correct: false},
            { text: "let", correct: false},
            { text: "const", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "What will true + false return?",
        answer: [
            { text: "0", correct: false},
            { text: "1", correct: true},
            { text: "true", correct: false},
            { text: "false", correct: false},
        ]
    },
    {
        question: "Which will typeof 'Hello' return?",
        answer: [
            { text: "string", correct: true},
            { text: "text", correct: false},
            { text: "object", correct: false},
            { text: "number", correct: false},
        ]
    },
    {
        question: "Which function is used to print something in console?",
        answer: [
            { text: "print()", correct: false},
            { text: "log()", correct: false},
            { text: "console.log()", correct: true},
            { text: "echo()", correct: false},
        ]
    },
    {
        question: "Which data type is NOT in JavaScript?",
        answer: [
            { text: "Number", correct: false},
            { text: "Boolean", correct: false},
            { text: "Float", correct: true},
            { text: "String", correct: false},
        ]
    },
    {
        question: "What is the default value of an uninitialized variable?",
        answer: [
            { text: "null", correct: false},
            { text: "undefined", correct: true},
            { text: "0", correct: false},
            { text: "empty", correct: false},
        ]
    },
    {
        question: "Which keyword is used to define a constant?",
        answer: [
            { text: "let", correct: false},
            { text: "var", correct: false},
            { text: "constant", correct: false},
            { text: "const", correct: true},
        ]
    },
    {
        question: "Which method is used to add an element at the end of an array?",
        answer: [
            { text: "push()", correct: true},
            { text: "pop()", correct: false},
            { text: "shift()", correct: false},
            { text: "unshift()", correct: false},
        ]
    },
    {
        question: "What does NaN stand for?",
        answer: [
            { text: "Not a Name", correct: false},
            { text: "Not a Number", correct: true},
            { text: "New and Null", correct: false},
            { text: "None", correct: false},
        ]
    },
    {
        question: "Which loop is guaranteed to run at least once?",
        answer: [
            { text: "for", correct: false},
            { text: "while", correct: false},
            { text: "do...while", correct: true},
            { text: "foreach", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
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

    currentQuestion.answer.forEach(answer => {
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

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
              button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();