import { Controller } from '../../../libs/component/Controller.js';

export default class extends Controller {
    run() {
        this.view.create();
    }

    update(delta = 1) { }
}
