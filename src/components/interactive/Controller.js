import { Controller } from '../../../libs/component/Controller.js';
import CONSTANTS from '../shared/Constants.js';

export default class extends Controller {
    constructor() {
        super();

        this.pointersId = [];
        this.pointersPos = {};

        this.onSwipePointerDown = this.onSwipePointerDown.bind(this);
        this.onSwipePointerUp = this.onSwipePointerUp.bind(this);
        this.onRestartGame = this.onRestartGame.bind(this);
    }

    run() {
        const { initData } = this.model;
        this.view.create(initData);

        this.view.addSwipeCallbacks(this.onSwipePointerDown, this.onSwipePointerUp);
        this.view.addRestartCallback(this.onRestartGame);

        window.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    onKeyDown({ keyCode }) {
        const { keyCodes } = this.model.initData;

        let direction;
        switch (keyCode) {
            case keyCodes.LEFT:
                direction = CONSTANTS.SWIPE.LEFT; break;
            case keyCodes.RIGHT:
                direction = CONSTANTS.SWIPE.RIGHT; break;
            case keyCodes.DOWN:
                direction = CONSTANTS.SWIPE.DOWN; break;
            case keyCodes.UP:
                direction = CONSTANTS.SWIPE.UP; break;
            default: return;
        }

        this.emit('userSwipe', direction);
    }

    onSwipePointerDown({ data }) {
        if (Boolean(this.pointersId.length)) return;

        this.pointersId.push(data.pointerId);
        this.pointersPos.prev = data.getLocalPosition(this.view);
    }

    onSwipePointerUp({ data }) {
        const inTheList = id => this.pointersId.includes(id);
        if (!inTheList(data.pointerId)) return;

        this.pointersPos.curr = data.getLocalPosition(this.view);

        if (this.isSwipe(this.pointersPos)) {
            this.emit('userSwipe', this.calcSwipeDir(this.pointersPos));
        }

        this.pointersId = [];
        this.pointersPos = {};
    }

    calcSwipeDir({ prev, curr }) {
        console.log("WIPE");

        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? CONSTANTS.SWIPE.RIGHT : CONSTANTS.SWIPE.LEFT;
        } else {
            return dy > 0 ? CONSTANTS.SWIPE.DOWN : CONSTANTS.SWIPE.UP;
        }
    }

    onUpdateScore(score) {
        this.model.updateScore(score);
        this.view.updateScore(this.model.currentScore)
    }

    onRestartGame(event) {
        event.stopPropagation();
        this.view.deactivate(this.onSwipePointerDown, this.onSwipePointerUp, this.onRestartGame);
        window.dispatchEvent(new Event("restartGame"));
    }

    onGameOver() {
        this.view.deactivate(this.onSwipePointerDown, this.onSwipePointerUp, this.onRestartGame);
        this.view.showPopUp((event) => {
            this.onRestartGame(event)
        });
    }

    isSwipe({ curr, prev }) {
        return (
            Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)) >= this.model.initData.swipeDistance
        );
    }

    update(delta = 1) { }
}
