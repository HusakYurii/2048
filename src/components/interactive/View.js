import { View } from '../../../libs/component/View.js';
import { UIBuilder } from '../../../libs/UIBuilder.js';

export default class extends View {
    constructor() {
        super();

        this.swipeLayer = null;
        this.scoreLable = null;
    }

    create({ width, height }) {
        this.swipeLayer = UIBuilder.rect({ color: 0xFFFFFF, alpha: 0.01, width, height });
        this.swipeLayer.interactive = true;
        this.addChild(this.swipeLayer);

        this.scoreLable = UIBuilder.createSprite({
            texture: this.assets['scoreLableBg'],
            modifiers: {
                anchor: { x: 0.5, y: 0.5 },
                position: { x: -38, y: -250 }
            }
        });

        this.addChild(this.scoreLable);

        const text = UIBuilder.createText({
            text: "0",
            styles: {
                fill: "0xFFFFFF",
                fontWeight: "bold",
                fontSize: 40,
            },
            modifiers: {
                anchor: { x: 0.5, y: 0.5 }
            }
        });

        this.scoreLable.text = text;
        this.scoreLable.addChild(text);

    }

    addSwipeCallbacks(onPointerDown, onPointerUp) {
        this.swipeLayer.on("pointerdown", onPointerDown);
        this.swipeLayer.on("pointerupoutside", onPointerUp);
        this.swipeLayer.on("pointerup", onPointerUp);
    }

    updateScore(score) {
        this.scoreLable.text.text = score;
    }
}
