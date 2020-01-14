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

    configureGrid(data) {
        const { emptyGrid, cellSizes: cS, filedSizes: fS } = data;


        return emptyGrid.map((gridRow) => {
            return gridRow.map(({ type, row, col }) => {
                const x = -(fS.width - cS.pitch - cS.width) / 2 + ((cS.width + cS.pitch) * col);
                const y = -(fS.height - cS.pitch - cS.height) / 2 + ((cS.height + cS.pitch) * row);
                return { x, y, row, col, type, ...cS };
            });
        })

        // return na obejct with {x,y,w,h,row,col,type}
        // I will use that to build empty cells for bg and actual first cells for game
    }
}