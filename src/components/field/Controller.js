import { Controller } from '../../../libs/component/Controller.js';
import { Engine } from './engine/Engine.js';

export default class extends Controller {
    constructor(...params) {
        super(...params);

        this.engine = new Engine();
    }
    run() {
        const { initData, filedSizes } = this.model;

        const emptyGrid = this.engine.generateGrid(initData.grid);
        const gridConfig = this.engine.configureGrid({ emptyGrid, filedSizes, ...initData });

        this.model.setGridMap(gridConfig);

        this.view.createFiledBg(filedSizes);
        this.view.createFieldBgCells(gridConfig);
        this.view.setCellTintMap(initData.cellsTintMap);
    }

    onUserSwipe(...args) {

    }

    update(delta = 1) { }
}
