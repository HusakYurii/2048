export class Engine {
    constructor() {

    }

    generateGrid({ rows, columns }) {
        const grid = Array.from({ length: rows })
            .map((_) => Array.from({ length: columns }).fill(0));

        return grid.map((row, rowIndx) => {
            return row.map((type, colIndx) => ({ type, row: rowIndx, col: colIndx }));
        });
    }

    configureGrid() {
        // return na obejct with {filed: {w, h}, cells: {x,y,w,h,row,col,type}}
        // I will use that to build empty cells for bg and actual first cells for game
    }
}