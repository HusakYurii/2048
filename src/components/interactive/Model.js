import { Model } from '../../../libs/component/Model.js';

export default class extends Model {
    constructor() {
        super();

        this.initData = {};
    }

    setData({ model }) {
        this.initData = Object.assign({}, model);
    }
}
