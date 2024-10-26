const paragraphs = [
    "Дорога і найрідніша наша бабусю!",
    "Сьогодні особливий день — день, коли народилася ти, наша найдобріша і наймудріша людина! Вітаємо тебе з цим прекрасним святом і хочемо побажати, щоб кожен новий день приносив тільки радість, тепло і спокій.",
    "Ти для нас — джерело безмежної любові, мудрості і доброти. Твоя посмішка завжди зігріває, а твоя підтримка додає сил і натхнення. Дякуємо тобі за твою турботу, за всі настанови і цінні поради, які ти завжди готова дати. Ти — наша справжня берегиня, наша зірка, що світить і вказує правильний шлях.",
    "Нехай твоє здоров’я буде міцним, а душа сповнена світлом і гармонією. Бажаємо тобі безмежної радості, натхнення на кожен день, приємних сюрпризів і щирих посмішок від близьких. Нехай тебе оточують лише хороші люди, а всі твої мрії збуваються! Ми безмежно любимо тебе і дуже цінуємо кожен момент, який маємо можливість провести поруч із тобою.",
    "З днем народження, наша дорога бабусю!"
];

const textArea = document.getElementById("text-area");
const movingImage = document.getElementById("moving-image");
const images = ["image1.png", "image2.png"];
let currentImageIndex = 0;

let paragraphIndex = 0;
let charIndex = 0;

// Позиція і швидкість зображення
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 3;
let velocityY = 3;

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

// Функція для руху зображення
function moveImage() {
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const imageRect = movingImage.getBoundingClientRect();

    // Рух зображення
    posX += velocityX;
    posY += velocityY;

    // Перевірка зіткнення з межами контейнера
    if (posX <= containerRect.left || posX + imageRect.width >= containerRect.right) {
        velocityX = -velocityX;
        changeImage();
    }
    if (posY <= containerRect.top || posY + imageRect.height >= containerRect.bottom) {
        velocityY = -velocityY;
        changeImage();
    }

    // Оновлення позиції зображення
    movingImage.style.left = posX + "px";
    movingImage.style.top = posY + "px";

    requestAnimationFrame(moveImage);
}

// Функція для зміни зображення
function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    movingImage.src = images[currentImageIndex];
}

// Запуск функцій
typeParagraph();
moveImage();
