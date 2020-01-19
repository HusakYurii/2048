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

    initPlayableCells({ rows, columns }) {
        this.playableCells = Array.from({ length: rows }).map(_ => Array.from({ length: columns }).fill(null));
    }

    createFiledBg({ width, height }) {
        const background = UIBuilder.createSprite({
            texture: this.assets['fieldBackground'],
            modifiers: { anchor: { x: 0.5, y: 0.5 } }
        });

        background.width = width;
        background.height = height;

        this.addChild(background);
    }

    createFieldBgCells(gridConfig) {
        const texture = this.assets['baseCell'];

        gridConfig.forEach(gridRow => {
            const collection = gridRow.map(params => this.createCell(texture, params));
            this.addChild(...collection);
        });
    }

    setCellTintMap(tintMap) {
        this.tintMap = tintMap;
    }

    createCell(texture, params, tintMap = {}) {
        const Constructor = params.type === 0 ? EmptyCell : Cell;
        const cell = new Constructor(texture, params, tintMap);
        cell.position.set(params.x, params.y);
        return cell;
    }
}
