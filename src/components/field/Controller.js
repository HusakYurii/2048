import { Controller } from '../../../libs/component/Controller.js';
import { Engine } from './engine/Engine.js';

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

        this.view.createFiledBg(filedSizes, gridConfig);
    }

    onUserSwipe(...args) {

    }

    update(delta = 1) { }
}
