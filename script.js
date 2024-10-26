let posX = 0, posY = 0;
let velocityX = 2, velocityY = 2;
const text = "Це приклад тексту, який поступово з’являється...";
let textIndex = 0;
const textArea = document.getElementById("text-area");
const movingImage = document.getElementById("moving-image");

async function loadWasm() {
    const wasmModule = await fetch('collision.wasm');
    const wasmInstance = await WebAssembly.instantiateStreaming(wasmModule);
    return wasmInstance.instance.exports;
}

loadWasm().then((wasm) => {
    function typeText() {
        if (textIndex < text.length) {
            textArea.textContent += text[textIndex++];
            setTimeout(typeText, 100);
        }
    }

    function moveImage() {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const textRect = textArea.getBoundingClientRect();
        const imageRect = movingImage.getBoundingClientRect();

        wasm.calculateCollision(
            posX, posY, imageRect.width, imageRect.height,
            containerRect.width, containerRect.height,
            textRect.left, textRect.top, textRect.width, textRect.height,
            velocityX, velocityY
        );

        posX += velocityX;
        posY += velocityY;

        movingImage.style.left = posX + "px";
        movingImage.style.top = posY + "px";

        requestAnimationFrame(moveImage);
    }

    typeText();
    moveImage();
});
