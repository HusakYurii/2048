export class Engine {
    constructor() { }

    calculateFieldSizes({ grid, cellSizes }) {
        return {
            width: cellSizes.width * grid.columns + cellSizes.pitch * (grid.columns + 1),
            height: cellSizes.height * grid.rows + cellSizes.pitch * (grid.rows + 1)
        };
    }

    generateGrid({ rows, columns }) {
        const grid = Array.from({ length: rows })
            .map((_) => Array.from({ length: columns }).fill(0));

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

        return emptyGrid.map((gridRow) => {
            return gridRow.map(({ type, row, col }) => {
                const pos = calcPosition(filedSizes, cellSizes, col, row);
                return { row, col, type, ...cellSizes, ...pos };
            });
        });
    }

    generateRandomCells(gridData) {
        const emptyCells = gridData.flat()
            .filter(cell => cell.type === 0);

        const type = Engine.randomInt(0, 10) < 5 ? 2 : 4;
        let indx = Engine.randomInt(0, emptyCells.length);

        while (true) {
            if (emptyCells[indx].type === 0) break;
            else indx = Engine.randomInt(0, emptyCells.length);
        }

        return [{ create: [{ ...emptyCells[indx], type }] }]
    }

    slideGrid(gridData) {
        return gridData.map((gridRow) => this.slideRow(gridRow))
            .flat();
    }

    // TODO think of optimizing this mess
    slideRow(arr) {
        const results = [];
        if (arr.length === 0) return results;

        const first = arr.shift();
        const next = arr.find(val => val.type !== 0);

        if (!next) {
            return this.slideRow(arr);
        } else if (first.type === 0) {
            results.push({
                from: { row: next.row, col: next.col },
                to: { row: first.row, col: first.col },
                create: [{ ...first, type: next.type }],
                remove: [{ ...next }]
            });
            first.type = next.type;
            next.type = 0;
            arr.unshift(first);
        } else if (first.type !== next.type) {
            if (first.col + 1 !== next.col) {
                results.push({
                    from: { row: next.row, col: next.col },
                    to: { row: first.row, col: first.col + 1 },
                    create: [{ ...arr[0], type: next.type }],
                    remove: [{ ...next }]
                });
                arr[0].type = next.type;
                next.type = 0;
            }
        } else if (first.type === next.type) {
            results.push({
                from: { row: next.row, col: next.col },
                to: { row: first.row, col: first.col },
                create: [{ ...first, type: first.type + next.type }],
                remove: [{ ...first }, { ...next }]
            });
            next.type = 0;
        }

        return [...results, ...this.slideRow(arr)];
    }
}

Engine.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
