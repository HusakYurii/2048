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
            },
            restartButton: {
                width: 70,
                height: 60,
                radius: 5,
                type: 'roundedRect',
                color: '0x2e3aec'
            },
            popup: {
                width: 350,
                height: 500,
                radius: 10,
                type: 'roundedRect',
                color: '0x2e3aec'
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
            },
            {
                subscribeTo: {
                    componentName: 'Field',
                    eventName: 'gameOver',
                    type: 'once'
                },
                use: {
                    callbackName: 'onGameOver',
                }
            }
        ]
    }
});
