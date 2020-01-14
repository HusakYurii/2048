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

    setGridMap(gridMap) {
        this.grid = gridMap.map(gridRow => {
            return gridRow.map(val => new CellModel(val));
        });
    }

    get filedSizes() {
        const { grid, cellSizes } = this.initData;

        return {
            width: cellSizes.width * grid.columns + (cellSizes.pitch * grid.columns + 1),
            height: cellSizes.height * grid.rows + (cellSizes.pitch * grid.rows + 1)
        };
    }
}
