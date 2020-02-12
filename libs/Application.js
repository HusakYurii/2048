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

    getComponentByName(name) {
        return this.components[name.toLowerCase()];
    }

    resizeApp() {
        const { width, height } = this.screen;

        Object.values(this._components).forEach(({ controller }) => {
            controller.view.position.set(width / 2, height / 2)
            controller.resize();
        });
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
        this.subscribeComponents();
        this.runAllComponents();
        this.resizeApp();
    }

    runAllComponents() {
        Object.values(this._components)
            .forEach(({ controller }) => {
                controller.run();
                this.stage.addChild(controller.view);
                this.ticker.add(delta => controller.update(delta));
            });
    }

    subscribeComponents() {
        Object.values(this._rawComponents)
            .forEach(({ config, name }) => {
                const currComponent = this.getComponentByName(name);

                config.events.forEach(({ subscribeTo, use }) => {
                    const { componentName, eventName, type } = subscribeTo;
                    const target = this.getComponentByName(componentName);

                    target.controller[type](
                        eventName,
                        currComponent.controller[use.callbackName],
                        currComponent.controller
                    );
                });
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