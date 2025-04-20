const paragraphs = [
    "Дорога і найрідніша Юліє!",
    "Сьогодні особливий день — день, коли народилася ти, наша найдобріша красуня! Вітаємо тебе з цим прекрасним святом і хочемо побажати, щоб кожен новий день приносив тільки радість, тепло і спокій.",
    "Ти для нас — джерело безмежної любові та краси. Твоя посмішка завжди зігріває, а твоя підтримка додає сил і натхнення. Дякуємо тобі за твою турботу, за всі настанови і цінні поради, які ти завжди готова дати. Ти — наша справжня берегиня, наша зірка, що світить і вказує правильний шлях.",
    "Нехай твоє здоров’я буде міцним, а душа сповнена світлом і гармонією. Бажаємо тобі безмежної радості, натхнення на кожен день, приємних сюрпризів і щирих посмішок від близьких. Нехай тебе оточують лише хороші люди, а всі твої мрії збуваються! Ми безмежно любимо тебе і дуже цінуємо кожен момент, який маємо можливість провести поруч із тобою.",
    "З днем народження, наша прекрасна Юлічко!"
];

const textArea = document.getElementById("text-area");
const images = ["image1.png", "image2.png"];
const movingImages = [];
const imageCount = 4; // Всього 4 зображення (по 2 кожного типу)
const offset = 100; // Відступ від країв екрану

// Кути для початкового розміщення зображень з відступом від граней
const corners = [
    { x: offset, y: offset },                                        // Верхній лівий
    { x: window.innerWidth - offset - 60, y: offset },               // Верхній правий
    { x: offset, y: window.innerHeight - offset - 60 },              // Нижній лівий
    { x: window.innerWidth - offset - 60, y: window.innerHeight - offset - 60 } // Нижній правий
];

let paragraphIndex = 0;
let charIndex = 0;

// Функція для поступового додавання тексту
function typeParagraph() {
    if (paragraphIndex < paragraphs.length) {
        if (charIndex < paragraphs[paragraphIndex].length) {
            textArea.innerHTML += paragraphs[paragraphIndex][charIndex];
            charIndex++;
            setTimeout(typeParagraph, 50); // Швидкість додавання символів
        } else {
            textArea.innerHTML += "<br><br>"; // Додаємо абзацний відступ
            paragraphIndex++;
            charIndex = 0;
            setTimeout(typeParagraph, 500); // Затримка між абзацами
        }
    }
}

// Створення рухомих зображень у кутах
function createMovingImages() {
    for (let i = 0; i < imageCount; i++) {
        const imgElement = document.createElement("img");
        imgElement.src = images[i % images.length];
        imgElement.classList.add("moving-image");
        imgElement.style.position = "absolute";
        imgElement.style.width = "60px";
        imgElement.style.height = "60px";
        document.body.appendChild(imgElement);

        movingImages.push({
            element: imgElement,
            posX: corners[i].x,
            posY: corners[i].y,
            velocityX: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
            velocityY: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
            cooldown: 0 // "Відступ часу" для запобігання застрягання
        });
    }
}

// Функція для руху зображень
function moveImages() {
    const containerRect = document.querySelector('.container').getBoundingClientRect();

    movingImages.forEach((img) => {
        const imageRect = img.element.getBoundingClientRect();

        // Оновлення позицій зображення
        img.posX += img.velocityX;
        img.posY += img.velocityY;

        // Зменшуємо "відступ часу", якщо він активний
        if (img.cooldown > 0) img.cooldown--;

        // Перевірка зіткнення з межами вікна браузера
        if (img.posX <= 0 || img.posX + imageRect.width >= window.innerWidth) {
            img.velocityX = -img.velocityX;
            img.velocityY = getRandomVelocity();
            changeImage(img);
        }
        if (img.posY <= 0 || img.posY + imageRect.height >= window.innerHeight) {
            img.velocityY = -img.velocityY;
            img.velocityX = getRandomVelocity();
            changeImage(img);
        }

        // Перевірка зіткнення з контейнером
        if (
            img.cooldown === 0 && // Перевіряємо, чи не в активному "відступі часу"
            img.posX < containerRect.right &&
            img.posX + imageRect.width > containerRect.left &&
            img.posY < containerRect.bottom &&
            img.posY + imageRect.height > containerRect.top
        ) {
            img.velocityX = -img.velocityX;
            img.velocityY = -img.velocityY;
            changeImage(img);
            img.cooldown = 20; // Встановлюємо "відступ часу" після зіткнення з контейнером
        }

        img.element.style.left = img.posX + "px";
        img.element.style.top = img.posY + "px";
    });

    requestAnimationFrame(moveImages);
}

// Функція для зміни зображення
function changeImage(img) {
    const currentIndex = images.indexOf(img.element.src.split('/').pop());
    img.element.src = images[(currentIndex + 1) % images.length];
}

// Функція для генерації випадкової швидкості відбиття
function getRandomVelocity() {
    return (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1);
}

// Запуск функцій
typeParagraph();
createMovingImages();
moveImages();
