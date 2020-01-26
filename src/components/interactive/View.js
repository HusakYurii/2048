import { View } from '../../../libs/component/View.js';
import { UIBuilder } from '../../../libs/UIBuilder.js';

export default class extends View {
    constructor() {
        super();

        this.swipeLayer = null;
    }

    create({ width, height }) {
        this.swipeLayer = UIBuilder.rect({ color: 0xFFFFFF, alpha: 0.01, width, height });
        this.swipeLayer.interactive = true;
        this.addChild(this.swipeLayer);
    }

    addSwipeCallbacks(onPointerDown, onPointerUp) {
        this.swipeLayer.on("pointerdown", onPointerDown);
        this.swipeLayer.on("pointerupoutside", onPointerUp);
        this.swipeLayer.on("pointerup", onPointerUp);
    }
}
