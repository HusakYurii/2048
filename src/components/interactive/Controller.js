import { Controller } from '../../../libs/component/Controller.js';
import CONSTANTS from '../shared/Constants.js';

export default class extends Controller {
    constructor() {
        super();

        this.pointersId = [];
        this.pointersPos = {};

        this.onSwipePointerDown = this.onSwipePointerDown.bind(this);
        this.onSwipePointerUp = this.onSwipePointerUp.bind(this);
    }


    run() {
        const { initData } = this.model;
        this.view.create(initData);

        this.view.addSwipeCallbacks(
            this.onSwipePointerDown,
            this.onSwipePointerUp
        );
    }

    onSwipePointerDown({ data }) {
        if (Boolean(this.pointersId.length)) return;

        this.pointersId.push(data.pointerId);
        this.pointersPos.prev = data.getLocalPosition(this.view);
    }

    onSwipePointerUp({ data }) {
        const inTheList = (id) => this.pointersId.includes(id);
        if (!inTheList(data.pointerId)) return;

        this.pointersPos.curr = data.getLocalPosition(this.view);

        this.emit('userSwipe', this.calcSwipeDir(this.pointersPos));

        this.pointersId = [];
        this.pointersPos = {};
    }

    calcSwipeDir({ prev, curr }) {
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            return (dx > 0) ? CONSTANTS.SWIPE.RIGHT : CONSTANTS.SWIPE.LEFT;
        } else {
            return (dy > 0) ? CONSTANTS.SWIPE.DOWN : CONSTANTS.SWIPE.UP;
        }
    }

    update(delta = 1) { }
}
