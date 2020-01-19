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
}
