/**
 * @class
 * Each raw component class must me wrapped by this abstraction
 */
export class RawComponent {

    /**
     * @param {Object} params
     * @param {Sting} Object.name - name of a component
     * @param {Class} Object.model - an instance of Model class
     * @param {Class} Object.view  - an instance of View class
     * @param {Class} Object.controller  - an instance of Controller class
     * @param {Object} Object.config - data which will be set to the model
     */
    constructor({ name, model, view, controller, config = {} }) {
        this._name = name;
        this._view = view;
        this._model = model;
        this._config = config;
        this._controller = controller;
    }

    /** @readonly */
    get name() {
        return this._name;
    }

    /** @readonly */
    get config() {
        return this._config;
    }

    /** @readonly */
    get Model() {
        return this._model;
    }

    /** @readonly */
    get View() {
        return this._view;
    }

    /** @readonly */
    get Controller() {
        return this._controller;
    }
}