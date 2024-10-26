#include <emscripten/emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE
void calculateCollision(int imageX, int imageY, int imageWidth, int imageHeight, 
                        int containerWidth, int containerHeight,
                        int textX, int textY, int textWidth, int textHeight,
                        int& velocityX, int& velocityY) {
    
    if (imageX <= 0 || imageX + imageWidth >= containerWidth) {
        velocityX = -velocityX;
    }
    if (imageY <= 0 || imageY + imageHeight >= containerHeight) {
        velocityY = -velocityY;
    }

    bool collidesWithText = imageX < textX + textWidth &&
                            imageX + imageWidth > textX &&
                            imageY < textY + textHeight &&
                            imageY + imageHeight > textY;

    if (collidesWithText) {
        velocityX = -velocityX;
        velocityY = -velocityY;
    }
}
}
