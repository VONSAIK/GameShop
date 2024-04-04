// Отримуємо дані опитування з LocalStorage
const surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];

// Функція для відображення результатів опитування
function displaySurveyResults(results) {
    const surveyResultsContainer = document.getElementById('surveyResults');
    surveyResultsContainer.innerHTML = ''; // Очищаємо контейнер перед відображенням нових результатів

    // Проходимося по кожному результату опитування і створюємо HTML елемент для відображення
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
            <p><strong>Ім'я:</strong> ${result.name}</p>
            <p><strong>Вік:</strong> ${result.age}</p>
            <p><strong>Країна:</strong> ${result.country}</p>
            <p><strong>Дата народження:</strong> ${result.birthdate}</p>
            <p><strong>Жанри ігор:</strong> ${result.genre}</p>
            <p><strong>Улюблена гра:</strong> ${result.favoriteGame}</p>
            <p><strong>Частота гри:</strong> ${result.playFrequency}</p>
            <p><strong>Години на тиждень:</strong> ${result.hours}</p>
            <p><strong>Платформа:</strong> ${result.platform}</p>
            <p><strong>Відгук:</strong> ${result.feedback}</p>
            <hr>
        `;
        surveyResultsContainer.appendChild(resultElement);
    });
}

// Функція для фільтрації результатів опитування за віком
function filterByAge(results, age) {
    return results.filter(result => result.age == age);
}

// Функція для фільтрації результатів опитування за жанром
function filterByGenre(results, genre) {
    if (!genre) return results; // Якщо жанр не вибрано, повертаємо всі результати
    return results.filter(result => result.genre.includes(genre));
}
// Функція для фільтрації результатів опитування за платформою
function filterByPlatform(results, platform) {
    if (!platform) return results; // Якщо платформа не вказана, повертаємо всі результати
    return results.filter(result => result.platform.toLowerCase() === platform.toLowerCase());
}

// Функція для обробки події відправки форми фільтрації
document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ageFilter = parseInt(document.getElementById('ageFilter').value);
    const genreFilter = document.getElementById('genreFilter').value;
    const platformFilter = document.getElementById('platformFilter').value;

    let filteredResults = surveyResults;
    // Фільтруємо результати відповідно до обраних критеріїв
    filteredResults = filterByAge(filteredResults, ageFilter);
    filteredResults = filterByGenre(filteredResults, genreFilter);
    filteredResults = filterByPlatform(filteredResults, platformFilter);

    // Відображаємо відфільтровані результати
    displaySurveyResults(filteredResults);
});

// Відображення всіх результатів опитування при завантаженні сторінки
displaySurveyResults(surveyResults);