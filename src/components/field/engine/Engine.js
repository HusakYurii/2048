export class Engine {
    constructor() { }

    calculateFieldSizes({ grid, cellSizes }) {
        return {
            width: cellSizes.width * grid.columns + cellSizes.pitch * (grid.columns + 1),
            height: cellSizes.height * grid.rows + cellSizes.pitch * (grid.rows + 1)
        };
    }

    generateGrid({ rows, columns }) {
        const grid = Array.from({ length: rows }).map(_ => Array.from({ length: columns }).fill(0));

        return grid.map((row, rowIndx) => {
            return row.map((type, colIndx) => ({ type, row: rowIndx, col: colIndx }));
        });
    }

    configureGrid({ cellSizes, filedSizes, grid }) {
        const emptyGrid = this.generateGrid(grid);

        const calcPosition = (field, cell, col, row) => {
            return {
                x: -(field.width - cell.pitch * 2 - cell.width) / 2 + (cell.width + cell.pitch) * col,
                y: -(field.height - cell.pitch * 2 - cell.height) / 2 + (cell.height + cell.pitch) * row
            };
        };

        return emptyGrid.map(gridRow => {
            return gridRow.map(({ type, row, col }) => {
                const pos = calcPosition(filedSizes, cellSizes, col, row);
                return { row, col, type, ...cellSizes, ...pos };
            });
        });
    }

    generateRandomCells(gridData) {
        const emptyCells = gridData.flat().filter(({ type }) => type === 0);
        let indx = Engine.randomInt(0, emptyCells.length);
        let counter = 0;

        let cellData;

        while (true) {
            if (counter >= emptyCells.length) return;
            else counter += 1;

            if (emptyCells[indx].type === 0) break;
            else indx = Engine.randomInt(0, emptyCells.length);
        }

        return [Object.assign({}, emptyCells[indx], { type: 2 })];
    }
}

Engine.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
