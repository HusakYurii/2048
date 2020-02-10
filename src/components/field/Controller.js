import { Controller } from '../../../libs/component/Controller.js';
import { Engine } from './engine/Engine.js';

import { turnColumnsToRows } from '../shared/Tools.js';
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

        this.view.createField(filedSizes, gridConfig);

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
        let results = [];
        const gridData = this.model.getGrid();

        switch (direction) {
            case CONSTANTS.SWIPE.RIGHT:
                const reversed = gridData.map(row => row.reverse());
                results = this.engine.slideGrid(reversed);
                break;
            case CONSTANTS.SWIPE.LEFT:
                results = this.engine.slideGrid(gridData);
                break;
            case CONSTANTS.SWIPE.UP:
                const turnedUp = turnColumnsToRows(gridData);
                results = this.engine.slideGrid(turnedUp);
                break;
            case CONSTANTS.SWIPE.DOWN:
                const turnedDown = turnColumnsToRows(gridData)
                    .map(row => row.reverse());
                results = this.engine.slideGrid(turnedDown);
                break;
        }

        if (results.length === 0) {
            return;
        }

        this.model.updateData(results);
        this.view.updateView(results, () => {
            this.generateRandomCells();
            this.updateScoreLable(results);
        });
    }

    updateScoreLable(results) {
        const score = results.reduce((acc, result) => {
            const newCells = result.create.filter(val => val.isNew);
            const sum = newCells.reduce((acc, cell) => acc + cell.type, 0);
            return (acc + sum);
        }, 0);

        this.emit('updateScore', score);
    }

    update(delta = 1) { }
}
