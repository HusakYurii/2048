export class ICell extends PIXI.Sprite {
    constructor(texture, { row, col, type = 0 } = {}) {
        super(texture);

        this.row = row;
        this.col = col;
        this.type = type;

        this.anchor.set(0.5);
    }
}
