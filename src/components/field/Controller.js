import { Controller } from '../../../libs/component/Controller.js';
import { Engine } from './engine/Engine.js';

import CONSTANTS from '../shared/Constants.js';

export default class extends Controller {
    constructor(...params) {
        super(...params);

        this.engine = new Engine();
    }

    run() {
        const { initData } = this.model;
        const filedSizes = this.engine.calculateFieldSizes(initData);
        const gridConfig = this.engine.configureGrid({ filedSizes, ...initData });

        this.model.setCalcultedData(gridConfig);

        this.view.initViewData(initData);

        this.view.createFiledBg(filedSizes, gridConfig);

        this.startGame();
    }

    startGame() {
        this.generateRandomCells();
        this.generateRandomCells();
    }

    generateRandomCells() {
        const results = this.engine.generateRandomCells(this.model.getGrid());
        this.model.updateData(results);
        this.view.updateView(results);
    }

    onUserSwipe(direction) {
        const results = this.engine.slideGrid(this.model.getGrid());
        this.model.updateData(results);
        this.view.updateView(results);
        this.generateRandomCells();
    }

    update(delta = 1) { }
}
