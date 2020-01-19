import { RawComponent } from '../../../libs/component/RawComponent.js';
import Controller from './Controller.js';
import Model from './Model.js';
import View from './View.js';

export default new RawComponent({
    name: 'InteractiveLayer',
    view: View,
    model: Model,
    controller: Controller,
    config: {
        texturesToGenerate: {},
        events: []
    }
});
