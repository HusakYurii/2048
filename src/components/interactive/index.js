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
        model: {
            width: 420,
            height: 600
        },
        texturesToGenerate: {
            scoreLableBg: {
                width: 220,
                height: 60,
                radius: 5,
                type: 'roundedRect',
                color: '0xbbada0'
            }
        },
        events: [
            {
                subscribeTo: {
                    componentName: 'Field',
                    eventName: 'updateScore',
                    type: 'on'
                },
                use: {
                    callbackName: 'onUpdateScore',
                }
            }
        ]
    }
});
