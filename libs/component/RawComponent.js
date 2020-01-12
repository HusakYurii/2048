export class RawComponent {
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