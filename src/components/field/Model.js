import { Model } from "../../../libs/component/Model.js";

export default class extends Model {
    constructor() {
        super();

        this.initData = {};
        this.grid = null;
        this.gridConfig = null;
    }

    setData({ model }) {
        this.initData = Object.assign({}, model)
    }

    setGridMap(grid) {
        this.grid = grid;
    }

    setGridConfig(gridConfig) {
        this.gridConfig = gridConfig;
    }

    get filedSizes() {
        const { grid, cellSizes } = this.initData;

        return {
            width: (cellSizes.width * grid.columns) + (cellSizes.pitch * grid.columns + 1),
            height: (cellSizes.height * grid.rows) + (cellSizes.pitch * grid.rows + 1)
        }
    }
}
