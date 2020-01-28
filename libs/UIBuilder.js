export class UIBuilder {
    static createContainer() {
        return new PIXI.Container();
    }

    static createSprite({ texture, modifiers } = {}) {
        const sprite = new PIXI.Sprite(texture);
        return this._useModifiers(sprite, modifiers);
    }

    static createText({ text = "", styles = {}, modifiers } = {}) {
        const txt = new PIXI.Text(text, styles);
        return this._useModifiers(txt, modifiers);
    }

    static _useModifiers(target, modifiers = {}) {
        ["position", "anchor", "scale", "alpha", "zIndex", "rotation"]
            .filter(prop => Boolean(modifiers[prop]))
            .forEach(prop => this._modify(target, prop, modifiers[prop]));
        return target;
    }

    static _modify(target, property, modifier) {
        if (typeof (modifier) !== "object") target[property] = modifier;
        else target[property] = Object.assign(target[property], modifier);
    }

    /**
     * RoundedRect
     * @static
     * @memberOf UIBuilder
     * @return {PIXI.Graphics} - rounded rectangle
     * */
    static RoundedRect({ color, alpha = 1, width, height, radius = 5 }) {
        return new PIXI.Graphics()
            .beginFill(color, alpha)
            .drawRoundedRect(-width / 2, -height / 2, width, height, radius)
            .endFill();
    }

    /**
     * Rect
     * @static
     * @memberOf UIBuilder
     * @return {PIXI.Graphics} - rectangle
     * */
    static rect({ color, alpha = 1, width, height }) {
        return new PIXI.Graphics()
            .beginFill(color, alpha)
            .drawRect(-width / 2, -height / 2, width, height)
            .endFill();
    }

    /***
     * graphicsFrom - creates an instance of PIXI.Graphics from config
     * @static
     * @memberOf UIBuilder
     * @return {PIXI.Graphics}
     * @param {String} typeOfGraphics - a type of graphics which need o create
     * @param {Object} config - a config file with data for a graphic object
     */
    static graphicsFrom(typeOfGraphics, config) {
        switch (typeOfGraphics) {
            case "rect":
                return this.rect(config);
            case "roundedRect":
                return this.RoundedRect(config);
            default:
                throw new Error(`There is no such type of graphics as ${typeOfGraphics} in UIBuilder`);
        }
    }
}