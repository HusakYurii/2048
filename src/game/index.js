import { Application } from '../../libs/Application.js';
import { UIBuilder } from '../../libs/UIBuilder.js';

export default class Game extends Application {
    constructor(params) {
        super(params);

        this.restartGame = this.restartGame.bind(this);
    }

    restartGame() {
        // TODO think about cleaning cache
        window.removeEventListener("restartGame", this.restartGame);

        this.stage.removeChildren();
        this.init();
        this.run();
    }

    run() {
        /* As I do not use any assets for the game, I need to generate new ones before running the game */
        this.generateAllTextures();

        super.run();

        this.ticker.add(this._tweensLoop.bind(this));
        window.addEventListener("restartGame", this.restartGame);
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

    _tweensLoop() {
        if (window.TWEEN) {
            window.TWEEN.update(this.ticker.lastTime);
        }
    }
}
