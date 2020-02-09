import { Application } from '../../libs/Application.js';
import { UIBuilder } from '../../libs/UIBuilder.js';

export default class Game extends Application {
    constructor(params) {
        super(params);
    }

    run() {
        /* As I do not use any assets for the game, I need to generate new ones before running the game */
        this.generateAllTextures();
        /* TODO this is a new mechanic - move it to super class! */
        this.subscribeComponents();
        super.run();

        this.ticker.add(this._tweensLoop.bind(this));
    }

    generateAllTextures() {
        const convertDataToAssets = data => {
            return data.reduce((acc, [name, params]) => {
                const displayObject = UIBuilder.graphicsFrom(params.type, params);
                const texture = this.renderer.generateTexture(
                    displayObject,
                    PIXI.SCALE_MODES.LINEAR,
                    window.devicePixelRatio
                );
                acc[name] = texture;
                return acc;
            }, {});
        };

        Object.values(this._rawComponents).forEach(({ name, config }) => {
            if (!config.texturesToGenerate) return;
            const data = Object.entries(config.texturesToGenerate);
            const assets = convertDataToAssets(data);
            const component = this.getComponentByName(name);
            component.controller.setAssets(assets);
        });
    }

    subscribeComponents() {
        Object.values(this._rawComponents).forEach(({ config, name }) => {
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

    /* TODO move it to the super class */
    getComponentByName(name) {
        return this.components[name.toLowerCase()];
    }

    _tweensLoop() {
        if (window.TWEEN) {
            window.TWEEN.update(this.ticker.lastTime);
        }
    }
}
