document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Отримання даних з форми
    var formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        bio: document.getElementById('bio').value,
        agreeTerms: document.getElementById('agreeTerms').checked
    };

    // Зберігання даних у local storage
    localStorage.setItem('registrationData', JSON.stringify(formData));

    alert('Ви успішно зареєстровані!');
    document.getElementById('registrationForm').reset();
});