import { Application } from "../libs/Application.js";
import { UIBuilder } from "../libs/UIBuilder.js";
import CONFIG from "./configs/gameConfig.js";

import Field from "./components/field/index.js";

class Game extends Application {
    constructor(params) {
        super(params);
    }

    run() {
        /* As I do not use any assets for the game, I need to generate new ones before running the game */
        this.generateAllTextures();
        super.run();
    }

    generateAllTextures() {
        const convertDataToAssets = (data) => {
            return data.reduce((acc, [name, params]) => {
                const displayObject = UIBuilder.graphicsFrom(params.type, params);
                const texture = this.renderer.generateTexture(displayObject, PIXI.SCALE_MODES.LINEAR, window.devicePixelRatio);
                acc[name] = texture;
                return acc;
            }, {});
        };


        Object.values(this._rawComponents)
            .forEach(({ name, config }) => {
                if (!config.texturesToGenerate) return;
                const data = Object.entries(config.texturesToGenerate);
                const assets = convertDataToAssets(data);
                const component = this.components[name.toLowerCase()];
                component.controller.setAssets(assets);
            });
    }
}
/** Create an instance of application */
const game = Game.create(CONFIG);

/** Register raw component */
game.registerComponent([Field]);

/** Init all components with data */
game.init();

/** Run an application */
game.run();