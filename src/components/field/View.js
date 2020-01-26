import { View } from '../../../libs/component/View.js';
import { UIBuilder } from '../../../libs/UIBuilder.js';
import { EmptyCell } from './ui/EmptyCell.js';
import { Cell } from './ui/Cell.js';

export default class extends View {
    constructor() {
        super();

        this.tintMap = {};
        this.playableCells = [];
    }

    initViewData({ grid, cellsTintMap }) {
        const createArr = (n) => Array.from({ length: n });
        this.playableCells = createArr(grid.row).map(x => createArr(grid.columns)).fill(null);
        this.tintMap = cellsTintMap;
    }

    createFiledBg(filedSizes, gridConfig) {
        const background = UIBuilder.createSprite({
            texture: this.assets['fieldBackground'],
            modifiers: { anchor: { x: 0.5, y: 0.5 } }
        });

        background.width = filedSizes.width;
        background.height = filedSizes.height;

        this.addChild(background);

        gridConfig.forEach((gridRow) => {
            gridRow.forEach((params) => {
                this.addChild(this.createCell(this.assets['baseCell'], params));
            });
        });
    }

    createCell(texture, params, tintMap = {}) {
        const Constructor = params.type === 0 ? EmptyCell : Cell;
        const cell = new Constructor(texture, params, tintMap);
        cell.position.set(params.x, params.y);
        return cell;
    }
}
