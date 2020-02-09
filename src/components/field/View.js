import { View } from '../../../libs/component/View.js';
import { UIBuilder } from '../../../libs/UIBuilder.js';
import { EmptyCell } from './ui/EmptyCell.js';
import { Cell } from './ui/Cell.js';

import { invokeAfter } from '../shared/Tools.js';

export default class extends View {
    constructor() {
        super();

        this.tintMap = {};
        this.playableCells = [];
        this.cellsContainer = null;
    }

    initViewData({ grid, cellsTintMap }) {
        const createArr = n => Array.from({ length: n });
        this.playableCells = createArr(grid.rows).map(x => createArr(grid.columns).fill(null));
        this.tintMap = cellsTintMap;
    }

    createField(filedSizes, gridConfig) {
        const background = UIBuilder.createSprite({
            texture: this.assets['fieldBackground'],
            modifiers: { anchor: { x: 0.5, y: 0.5 } }
        });

        background.width = filedSizes.width;
        background.height = filedSizes.height;

        this.addChild(background);

        gridConfig.forEach(gridRow => {
            gridRow.forEach(params => {
                this.addChild(this.createCell(this.assets['baseCell'], params));
            });
        });

        this.cellsContainer = this.addChild(UIBuilder.createContainer());
    }

    createCell(texture, params, tintMap = {}) {
        const Constructor = params.type === 0 ? EmptyCell : Cell;
        const cell = new Constructor(texture, params, tintMap);
        cell.position.set(params.x, params.y);
        return cell;
    }

    onCellSlided(remove = [], create = [], cb = () => { }) {
        remove.forEach(({ col, row }) => {
            this.cellsContainer.removeChild(this.playableCells[row][col]);
            this.playableCells[row][col] = null;
        });

        create.forEach(params => {
            const cell = this.createCell(this.assets['baseCell'], params, this.tintMap);

            this.playableCells[cell.row][cell.col] = cell;
            this.cellsContainer.addChild(cell);
            params.isNew && cell.scaleUp();
        });

        cb();
    }

    updateView(rules = [], onUpdated = () => { }) {
        const afterCellSlided = invokeAfter(() => onUpdated(), rules.length);

        rules.forEach(({ from, to, remove, create }) => {
            if (!from || !to) {
                this.onCellSlided(remove, create, onUpdated);
                return;
            }

            const cell = this.playableCells[from.row][from.col];
            const newPos = { x: create[0].x, y: create[0].y };

            cell.slideTo(newPos, () => this.onCellSlided(remove, create, afterCellSlided));
        });

        if (window.Game) {
            console.log('%c View Data:', 'color: white; background: black; fint-size: 15px');
            console.dir(this.playableCells.map(row => row.map(val => (val ? val.type : val))));
        }
    }
}
