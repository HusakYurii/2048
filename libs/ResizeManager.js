/**
 * @class ResizeManager
 * Resize manager calculates the game's current sizes and reacts on
 * changing of window's size
 * */
export class ResizeManager {
    constructor({ width, height } = {}, onResized) {

        this.configSize = { width, height };
        this.onResized = onResized;

        window.addEventListener("resize", () => this.resizeView());
    }

    resizeView() {
        const { innerWidth, innerHeight } = window;
        let { width, height } = this.configSize;
        let gameW = 0;
        let gameH = 0;

        if (innerHeight > innerWidth) {  //portrait
            gameW = width | 0;
            gameH = height * (innerHeight / innerWidth) | 0;
        }
        else {  //landscape
            gameH = height | 0;
            gameW = width * (innerWidth / innerHeight) | 0;
        }

        const gameSize = { width: gameW, height: gameH };
        const windowSize = { width: innerWidth, height: innerHeight };
        this.onResized({ gameSize, windowSize });
    }

}