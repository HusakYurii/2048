/**
 * @class 
 * Super Class for a component based on MVC approach 
 * */
export class Controller extends PIXI.utils.EventEmitter {

    /**
     * @param {String} name - a component's name
     */
    constructor(name = "noName") {
        super();
        this._name = name;
        this._model = null;
        this._view = null;
    }

    init(model, view) {
        this._model = model;
        this._view = view;
    }

    setData(data) {
        this._model.setData(data);
    }

    setAssets(assets) {
        this._view.setAssets(assets);
    }

    resize(data) { 
        this._view.resize(data);
    }

    /** @abstract */
    run() { }


    /** @abstract */
    update(delta = 1) { }

    /** @readonly */
    get name() {
        return this._name;
    }

    /** @readonly */
    get model() {
        return this._model;
    }

    /** @readonly */
    get view() {
        return this._view;
    }
}