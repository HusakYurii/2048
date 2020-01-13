import { Model } from "../../../libs/component/Model.js";

export default class extends Model {
    constructor() {
        super();

        this.initData = {};
        this.grid = null;
    }

    setData({ model }) {
        this.initData = Object.assign({}, model)
    }

    setGridMap(grid) {
        this.grid = grid;
    }
}
