import { Model } from '../../../libs/component/Model.js';
import { CellModel } from './sub-models/CellModel.js';

export default class extends Model {
    constructor() {
        super();

        this.initData = {};
        this.grid = null;
    }

    setData({ model }) {
        this.initData = Object.assign({}, model);
    }

    setCalcultedData(gridConfig) {
        this.grid = gridConfig.map(gridRow => gridRow.map(val => new CellModel(val)));
    }

    updateData(cells) {
        cells.forEach(({ create = [], remove = [] }) => {
            remove.forEach(({ row, col }) => (this.grid[row][col].type = 0));
            create.forEach(({ row, col, type }) => (this.grid[row][col].type = type));
        });
    }

    getGridCopy() {
        return this.grid.map(gridRow => {
            return gridRow.map(cellModel => ({ ...cellModel }));
        });
    }

    get isGridFull() {
        return this.grid.every(row => {
            return row.every(val => val.type !== 0);
        });
    }
}
