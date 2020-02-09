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

export { invokeAfter, randomInt }
