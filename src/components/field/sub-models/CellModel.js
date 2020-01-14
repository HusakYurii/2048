import { Model } from '../../../../libs/component/Model';

class CellModel extends Model {
    constructor({ x, y, row, col, type, width, height }) {
        super();

        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.type = type;
        this.width = width;
        this.height = height;
    }
}
