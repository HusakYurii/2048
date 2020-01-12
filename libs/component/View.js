/*** Super Class for a component based on MVC approach */
export class View extends PIXI.Container {
    constructor() {
        super();

        this._assets = null;
    }

    setAssets(assets) {
        this._assets = assets;
    }

    /** @readonly */
    get assets() {
        return this._assets;
    }
}
