const invokeAfter = function (callback, num, args = [], scope) {
    let counter = 0;
    return function () {
        counter += 1;
        if (counter === num) {
            callback.apply(scope, ...args);
        }
    }
};


const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};


const turnColumnsToRows = function (grid) {
    const turned = [];
    for (let col = 0; col < grid[0].length; col += 1) {
        const newRow = [];
        for (let row = 0; row < grid.length; row += 1) {
            newRow.push(grid[row][col]);
        }
        turned.push(newRow);
    }
    return turned;
};

export { invokeAfter, randomInt, turnColumnsToRows };
