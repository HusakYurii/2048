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
        const results = this.engine.generateRandomCells(this.model.getGridCopy());
        this.model.updateData(results);
        this.view.updateView(results);

        this.checkIfGameOver();
    }

    checkIfGameOver() {
        const isGameOver = Object.values(CONSTANTS.SWIPE)
            .map(direction => {
                const preparedGrid = this.prepareGridFor(this.model.getGridCopy(), direction);
                return this.engine.slideGrid(preparedGrid);
            })
            .every(result => result.length === 0);

        if (isGameOver) {
            this.emit("gameOver");
        }
    }

    onUserSwipe(direction) {
        const gridData = this.model.getGridCopy();
        const preparedGrid = this.prepareGridFor(gridData, direction);
        const results = this.engine.slideGrid(preparedGrid);

        if (results.length === 0) {
            return;
        }

        this.model.updateData(results);
        this.view.updateView(results, () => {
            this.generateRandomCells();
            this.updateScoreLable(results);
        });
    }

    prepareGridFor(grid, direction) {
        switch (direction) {
            case CONSTANTS.SWIPE.RIGHT:
                return grid.map(row => row.reverse());
            case CONSTANTS.SWIPE.LEFT:
                return grid;
            case CONSTANTS.SWIPE.UP:
                return turnColumnsToRows(grid);
            case CONSTANTS.SWIPE.DOWN:
                return turnColumnsToRows(grid)
                    .map(row => row.reverse());
        }
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
