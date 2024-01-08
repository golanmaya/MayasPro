'use strict'

const questions = [
    {
        question: 'מאיפה מקבלים אריות את רוב המים שלהם?',
        answer: ['מהטרף שלהם', 'מנחלים'],
        correctAnswer: 'מהטרף שלהם'
    },
    {
        question: 'מכמה נוירונים מורכב המוח הממוצע?',
        answer: ['100 אלף', 'מיליון', 'מאה מיליארד', '10 מיליון', '800', 'המוח לא מורכב מנוירונים'],
        correctAnswer: 'מאה מיליארד'
    },
    {
        question: 'מה סוג הסוכר שיש בחלב?',
        answer: ['פרוקטוז', 'גלקטוז', 'סוכרוז', 'לקטוז'],
        correctAnswer: 'לקטוז'
    },
    {
        question: 'באיזו שנה טבעה הטיטאניק?',
        answer: ['1921', '1915', '1912', '1927'],
        correctAnswer: '1912'
    },
    {
        question: 'באיזו תקופה גאולוגית חי הדינוזאור הטורף טירנוזאור רקס?',
        answer: ['פלאוגן', 'קרטיקון', 'יורה', 'פרם'],
        correctAnswer: 'קרטיקון'
    },
    {
        question: 'איך קוראים לאטום עם מטען חשמלי חיובי או שלילי?',
        answer: ['מולקולה', 'אלקטרון', 'פרוטון', 'יון'],
        correctAnswer: 'יון'
    }
];

let score = 0;
let currentQuestionIndex = 0;

//======DOM REF
const elmScore = document.querySelector('#score');
const elmAnswerView = document.querySelector('#answer-review');
const elmQuestionNum = document.querySelector('#question-number');
const elmQuestion = document.querySelector('#question')
const elmAnswers = document.querySelector('#answers');
const elmQuestionNumber = document.querySelector('#question-number')

//-----REMOVE LOG LATER:
console.log(elmScore);
console.log(elmAnswerView);
console.log(elmQuestionNum);
console.log(elmQuestion);
console.log(elmAnswers);
//---------------------



function userChoose(answerButton) {
    const answer = answerButton.innerText;
    // 1. is the answer correct ? if yes: add 10 points to score
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        score += 10;
        elmAnswerView.innerText = "נכון מאוד!"
    } else {
        elmAnswerView.innerText = `התשובה הנכונה: ${questions[currentQuestionIndex].correctAnswer} `
    }
    // 2. advance one question (currentQuestionIndex++)
    currentQuestionIndex++;
    // 3. get rid of previous answer elements
    elmAnswers.innerHTML = '';
    // 4. update the UI (html)
    elmAnswerView.classList.remove('hidden')
    updateDisplay();
}


function updateDisplay() {

    elmScore.innerText = `${score} נקודות`;
    const answerElementsArray = document.querySelectorAll('.answer');
    // is game over ?
    if (questions.length === currentQuestionIndex) {
        elmQuestionNumber.innerText = `שאלה ${currentQuestionIndex} מתוך ${questions.length}`;
        elmQuestion.innerHTML =
            `
    המשחק הסתיים
    </br></br>
    צברת ${score} נקודות
    </br>
      מתוך סך הכל ${questions.length * 10} אפשריות
    `;
        for (let i = 0; i < answerElementsArray.length; i++) {
            answerElementsArray[i].remove();
        };
        return;
    }

    elmQuestionNumber.innerText = `שאלה ${currentQuestionIndex + 1} מתוך ${questions.length}`;

    elmQuestion.innerText = questions[currentQuestionIndex].question;

    // create answer elements ...
    const numberOfAnswers = questions[currentQuestionIndex].answer.length

    for (let i = 0; i < numberOfAnswers; i++) {
        const answerElement = document.createElement('button');
        answerElement.classList.add('answer');
        answerElement.onclick = function () { userChoose(this) };
        answerElement.innerText = questions[currentQuestionIndex].answer[i]
        elmAnswers.appendChild(answerElement);
    };

}

updateDisplay();

function startAgain() {
    score = 0;
    currentQuestionIndex = 0;
    elmAnswerView.innerText = '';
    elmAnswerView.classList.add('hidden')
    updateDisplay() //need to disable when game didnt start yet
}

