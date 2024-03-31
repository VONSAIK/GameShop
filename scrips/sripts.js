/*document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    var storedData = localStorage.getItem('registrationData');
    if (storedData) {
        var users = JSON.parse(storedData);
        var foundUser = users.find(function(user) {
            return user.email === email && user.password === password;
        });
        if (foundUser) {
            alert('Успішний вхід!');
            // Тут можна додати перенаправлення на іншу сторінку після входу
        } else {
            alert('Користувача з такою електронною поштою та паролем не знайдено.');
        }
    } else {
        alert('Ще немає зареєстрованих користувачів.');
    }
});*/