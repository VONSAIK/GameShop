const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question');
const answerContainer = document.getElementById('answers');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submitBtn');

let currentQuestion = 0;
const selectedAnswers = [];
let score = 0;
let quizData;

async function getQuizData() {
    try {
        const response = await fetch('../Data/quiz.json'); // Завантажуємо файл JSON
        const data = await response.json(); // Парсимо JSON
        return data; // Повертаємо дані
    } catch (error) {
        console.error('Помилка завантаження файлу JSON:', error);
    }
}

async function loadQuiz() {
    quizData = await getQuizData();
    showQuestion();
}

function showQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionContainer.innerHTML = `<p>${currentQuizData.question}</p>`;
    answerContainer.innerHTML = '';
    currentQuizData.answers.forEach((answer, index) => {
        const option = document.createElement('button');
        option.innerText = answer.text; // Отримуємо текст відповіді
        option.classList.add('btn');
        answerContainer.appendChild(option);
        option.addEventListener('click', () => {
            if (!selectedAnswers[currentQuestion]) {
                selectedAnswers[currentQuestion] = [];
            }
            if (selectedAnswers[currentQuestion].includes(index)) {
                const selectedIndex = selectedAnswers[currentQuestion].indexOf(index);
                selectedAnswers[currentQuestion].splice(selectedIndex, 1);
                option.style.backgroundColor = ''; // Видаляємо колір, якщо вибір скасовано
            } else {
                selectedAnswers[currentQuestion].push(index);
                option.style.backgroundColor = 'lightblue'; // Встановлюємо колір, якщо вибір зроблено
            }
        });
    });
}


function checkAnswer() {
    const currentQuizData = quizData[currentQuestion];
    const selectedAnswerIndexes = selectedAnswers[currentQuestion] || [];
    const correctAnswerIndex = currentQuizData.answers.findIndex(answer => answer.correct);

    if (selectedAnswerIndexes.includes(correctAnswerIndex)) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}



function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.innerHTML = '';
    let correctAnswers = 0;
    quizData.forEach((question, index) => {
        const resultItem = document.createElement('div');
        const selectedAnswerIndexes = selectedAnswers[index] || [];
        const isCorrect = selectedAnswerIndexes.every(index => question.answers[index].correct);
        if (isCorrect) {
            correctAnswers++;
        }
        resultItem.innerHTML = `
            <p><strong>Питання ${index + 1}:</strong> ${question.question}</p>
            <ul>
                ${question.answers.map((answer, i) => `
                    <li style="color: ${selectedAnswerIndexes.includes(i) ? 'blue' : 'black'};">${answer.text}</li>
                `).join('')}
            </ul>
            <p style="color: ${isCorrect ? 'green' : 'red'};">${isCorrect ? 'Правильно' : 'Неправильно'}</p>
        `;
        resultContainer.appendChild(resultItem);
    });

    resultContainer.innerHTML += `<p>Ви відповіли правильно на ${correctAnswers} з ${quizData.length} питань.</p>`;
}


loadQuiz();

submitButton.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});