import { Controller } from "../../../libs/component/Controller.js";
import { Engine } from "./engine/Engine.js";


export default class extends Controller {
    constructor(){
        super();

        this.engine = new Engine();
    }
    run() {
        const {initData, gridConfig} = this.model;
        const grid = this.engine.generateGrid(initData.grid);
        this.model.setGridMap(grid);
        
        this.view.createFiledBg();
        this.view.createFieldBgCells(grid);
    }

    update(delta = 1) {

    }
}