import { View } from '../../../libs/component/View.js';
import { UIBuilder } from '../../../libs/UIBuilder.js';

export default class extends View {
    constructor() {
        super();

        this.swipeLayer = null;
        this.scoreLable = null;
        this.restartBtn = null;
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

        this.restartBtn = UIBuilder.createSprite({
            texture: this.assets['restartButton'],
            modifiers: {
                anchor: { x: 0.5, y: 0.5 },
                position: { x: 108, y: -250 }
            }
        });
        this.restartBtn.interactive = true;
        this.addChild(this.restartBtn);

        const icon = UIBuilder.createText({
            text: "R",
            styles: {
                fill: "0xFFFFFF",
                fontWeight: "bold",
                fontSize: 40,
            },
            modifiers: {
                anchor: { x: 0.5, y: 0.5 }
            }
        });

        this.restartBtn.addChild(icon);
    }

    deactivate(onPointerDown, onPointerUp, onRestartClick) {
        this.swipeLayer.off("pointerdown", onPointerDown);
        this.swipeLayer.off("pointerupoutside", onPointerUp);
        this.swipeLayer.off("pointerup", onPointerUp);
        this.restartBtn.off("pointerdown", onRestartClick);

        this.swipeLayer.interactive = false;
        this.restartBtn.interactive = false;
    }

    showPopUp(callback) {
        const popup = UIBuilder.createSprite({
            texture: this.assets['popup'],
            modifiers: {
                anchor: { x: 0.5, y: 0.5 },
                scale: { x: 0, y: 0 }
            }
        });
        const text = UIBuilder.createText({
            text: "Game Over! Tap to restart!",
            styles: {
                fill: 0xFFFFFF,
                align: "center",
                breakWords: true,
                wordWrap: true,
                wordWrapWidth: 250,
                fontSize: 36
            },
            modifiers: {
                anchor: { x: 0.5, y: 0.5 }
            }
        });
        popup.interactive = true;
        popup.once("pointerdown", callback);

        popup.addChild(text);
        this.addChild(popup);

        new TWEEN.Tween(popup.scale)
            .to({ x: 1, y: 1 }, 500)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();

    }

    addSwipeCallbacks(onPointerDown, onPointerUp) {
        this.swipeLayer.on("pointerdown", onPointerDown);
        this.swipeLayer.on("pointerupoutside", onPointerUp);
        this.swipeLayer.on("pointerup", onPointerUp);
    }

    addRestartCallback(onRestartClick) {
        this.restartBtn.on("pointerdown", onRestartClick);
    }

    updateScore(score) {
        this.scoreLable.text.text = score;
    }
}
