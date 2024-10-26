// Текст для друку
const text = "Дорога і найрідніша наша бабусю! Сьогодні особливий день — день, коли народилася ти, наша найдобріша і наймудріша людина! Вітаємо тебе з цим прекрасним святом і хочемо побажати, щоб кожен новий день приносив тільки радість, тепло і спокій. Ти для нас — джерело безмежної любові, мудрості і доброти. Твоя посмішка завжди зігріває, а твоя підтримка додає сил і натхнення. Дякуємо тобі за твою турботу, за всі настанови і цінні поради, які ти завжди готова дати. Ти — наша справжня берегиня, наша зірка, що світить і вказує правильний шлях. Нехай твоє здоров’я буде міцним, а душа сповнена світлом і гармонією. Бажаємо тобі безмежної радості, натхнення на кожен день, приємних сюрпризів і щирих посмішок від близьких. Нехай тебе оточують лише хороші люди, а всі твої мрії збуваються! Ми безмежно любимо тебе і дуже цінуємо кожен момент, який маємо можливість провести поруч із тобою. З днем народження, наша дорога бабусю!";
let textIndex = 0;
const textArea = document.getElementById("text-area");

// Зображення та їх координати
const images = ["image1.png", "image2.png"];
let currentImageIndex = 0;
const movingImage = document.getElementById("moving-image");
let posX = 0;
let posY = 0;
let velocityX = 2;
let velocityY = 2;

// Функція для поступового написання тексту
function typeText() {
    if (textIndex < text.length) {
        textArea.textContent += text[textIndex];
        textIndex++;
        setTimeout(typeText, 100);  // Швидкість написання
    }
}

// Функція для руху зображення
function moveImage() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const textRect = textArea.getBoundingClientRect();
    const imageRect = movingImage.getBoundingClientRect();

    posX += velocityX;
    posY += velocityY;

    // Перевірка зіткнення з межами
    if (posX <= 0 || posX + imageRect.width >= containerRect.width) {
        velocityX = -velocityX;
        changeImage();
    }
    if (posY <= 0 || posY + imageRect.height >= containerRect.height) {
        velocityY = -velocityY;
        changeImage();
    }

    // Перевірка зіткнення з текстовим полем
    if (imageRect.left < textRect.right &&
        imageRect.right > textRect.left &&
        imageRect.top < textRect.bottom &&
        imageRect.bottom > textRect.top) {
        changeImage();
        velocityX = -velocityX;
        velocityY = -velocityY;
    }

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
typeText();
moveImage();
