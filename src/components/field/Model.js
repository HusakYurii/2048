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
        cells.forEach(({ create, remove }) => {
            remove && remove.forEach(({ row, col }) => (this.grid[row][col].type = 0));
            create && create.forEach(({ row, col, type }) => (this.grid[row][col].type = type));
        });

        if (window.Game) {
            console.log('%c Model Data:', 'color: white; background: black; fint-size: 15px');
            console.dir(this.grid.map(row => row.map(val => val.type)));
        }
    }

    getGrid() {
        return this.grid.map(gridRow => {
            return gridRow.map(cellModel => ({ ...cellModel }));
        });
    }
}
