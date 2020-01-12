/** Application class. It will manage all and keep all raw data, init components and run them */
export class Application extends PIXI.Application {
    constructor({ application } = {}) {
        super(application);

        this._components = {};
        this._rawComponents = {};

        if (application.debuggerMode) {
            window[this.constructor.name] = this;
        }
    }

    registerComponent(data) {
        if (Array.isArray(data)) {
            data.forEach(component => this.registerComponent(component));
            return;
        }

        if (this._rawComponents[data.name]) {
            throw new Error(`No way man! ${data.name} component has already been registered!`);
        }

        this._rawComponents[data.name] = data;
    }

    init() {
        Object.values(this._rawComponents)
            .forEach(({ name, config, Model, View, Controller }) => {
                const controller = new Controller(name);
                controller.init(new Model, new View);
                controller.setData(config);

                this._components[name.toLowerCase()] = { controller };
            });
    }

    run() {
        Object.values(this._components).forEach(({ controller }) => {
            controller.run();
            this.stage.addChild(controller.view);
            this.ticker.add(delta => controller.update(delta))
        });
    }

    /** @readonly */
    get components() {
        return this._components;
    }

    /**
     * @returns {Boolean}
     */
    get debuggerMode() {
        return this._debuggerMode;
    }

    /**
     * @param {Boolean} val
     */
    set debuggerMode(val) {
        this._debuggerMode = val;
    }

    /** Helper function 
    * @static
    */
    static create(config) {
        const app = new this(config);
        const container = config.container || document.querySelector("body");
        container.appendChild(app.view);
        return app;
    }
}