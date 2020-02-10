import { Model } from '../../../libs/component/Model.js';

export default class extends Model {
    constructor() {
        super();

        this.initData = {};
        this._currentScore = 0;
    }

    setData({ model }) {
        this.initData = Object.assign({}, model);
    }

    updateScore(num) {
        this._currentScore += num;
    }

    get currentScore() {
        return this._currentScore;
    }
}
