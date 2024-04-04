const form = document.getElementById('surveyForm');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            const surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];
            surveyResults.push(formObject);
            localStorage.setItem('surveyResults', JSON.stringify(surveyResults));
            alert('Дякуємо за ваші відповіді!');
            form.reset();
        });