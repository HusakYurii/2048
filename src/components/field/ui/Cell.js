import { ICell } from './ICell.js';
import { UIBuilder } from '../../../../libs/UIBuilder.js';

export class Cell extends ICell {
    constructor(texture, { row, col, type } = {}, tintMap) {
        super(texture);

        this.tint = tintMap[type].tint || "0xFFFFFF";
        this.type = type;
        this.row = row;
        this.col = col;
        this.text = '';

        this.createText();
    }

    createText() {
        this.text = UIBuilder.createText({
            text: '',
            styles: { fill: '0xFFFFFF', fontSize: 20 },
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
}
