import { ICell } from './ICell.js';
import { UIBuilder } from '../../../../libs/UIBuilder.js';

export class Cell extends ICell {
    constructor(texture, params, tintMap) {
        super(texture, params);

        this.tint = tintMap[params.type].tint || "0xFFFFFF";
        this.text = '';
        this._tween = null;

        this.createText();
        this.setText(this.type);
    }

    createText() {
        this.text = UIBuilder.createText({
            text: '',
            styles: { fill: '0x000000', fontSize: 20 },
            modifiers: {
                anchor: { x: 0.5, y: 0.5 }
            }
        });

        this.addChild(this.text);
    }

    setText(txt) {
        this.text.text = String(txt);
        this.text.scale.set(1); // reset scale back before calculating new scl factor
        const scl = Cell.calcSclFactor(this.width, this.text.width);
        this.text.scale.set(scl);
    }

    static calcSclFactor(cellW, txtW) {
        const padding = 8;
        const delta = cellW - txtW;
        let scl = 1;

        if (delta < padding * 2) {
            scl = (cellW - padding * 2) / txtW;
        }
        return scl;
    }

    stopTween() {
        if (this._tween) {
            this._tween.stop();
        }
    }

    scaleUp() {
        const time = 450;
        this.scale.set(0.7);

        this._tween = new TWEEN.Tween(this.scale)
            .to({ x: 1, y: 1 }, time)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();

        return this;
    }

    slideTo({ x, y }, cb) {
        const speed = 2.2;
        const time = Math.sqrt(Math.pow(x - this.x, 2), Math.pow(y - this.y, 2)) / speed;

        this._tween = new TWEEN.Tween(this.position)
            .to({ x, y }, time)
            .onComplete(() => cb())
            .start();

        return this;
    }
}
