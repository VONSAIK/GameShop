fetch('/Data/games.json')
            .then(response => response.json())
            .then(data => {
                // Отримано дані успішно, виводимо їх на сторінці
                var gameDetails = document.getElementById('gameDetails');
                // Отримуємо ідентифікатор гри з URL
                var params = new URLSearchParams(window.location.search);
                var gameId = params.get('id');
                // Знаходимо гру за ідентифікатором
                var game = data.find(game => game.id == gameId);
                if (game) {
                    // Виводимо дані про гру на сторінці
                    gameDetails.innerHTML = `
                    <div>
                        <h2>${game.title}</h2>
                        <img src="${game.image}" alt="${game.title}">
                        <div>
                            <ol>
                                <il>Дата релізу:${game.release_date}</il>
                                <il>Жанри: ${game.genre}</il>
                                <il>Розробник: ${game.developer}</il>
                                <ilr>Видавець: ${game.publishe}</il>
                                <il>Платформа: ${game.platform}</il>
                            </ol>
                            <table border="1">
                                <tr>
                                    <td>Операційна система</td>
                                    <td>${game.os}</td>
                                </tr>
                                <tr>
                                    <td>Процесор</td>
                                    <td>${game.processor}</td>
                                </tr>
                                <tr>
                                    <td>Оперативна пам'ять</td>
                                    <td>${game.ram}</td>
                                </tr>
                                <tr>
                                    <td>Відеокарта</td>
                                    <td>${game.video_card}</td>
                                </tr>
                                <tr>
                                    <td>Місце на диску</td>
                                    <td>${game.disc_space}</td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <h3>Опис гри</h3>
                            <p>${game.description}</p>
                            <button><a href="${game.link}">Завантажити гру</a></button>
                        </div>
                    </div>
                    `;
                } else {
                    // Якщо гра не знайдена
                    gameDetails.innerHTML = `<p>Гра з ідентифікатором ${gameId} не знайдена</p>`;
                }
            })
            .catch(error => console.error('Помилка завантаження даних:', error));