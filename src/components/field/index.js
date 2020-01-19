import { RawComponent } from '../../../libs/component/RawComponent.js';
import Controller from './Controller.js';
import Model from './Model.js';
import View from './View.js';

export default new RawComponent({
    name: 'Field',
    view: View,
    model: Model,
    controller: Controller,
    config: {
        model: {
            grid: { rows: 4, columns: 4 },
            cellSizes: {
                width: 64,
                height: 64,
                pitch: 8
            },
            cellsTintMap: {
                '0': {
                    tint: '0xffffff'
                },
                '2': {
                    tint: '0xeee4da'
                },
                '4': {
                    tint: '0xede0c8'
                },
                '8': {
                    tint: '0xf2b179'
                },
                '16': {
                    tint: '0xf59563'
                },
                '32': {
                    tint: '0xf67c5f'
                },
                '64': {
                    tint: '0xf65e3b'
                },
                '128': {
                    tint: '0xedce72'
                }
            }
        },

        texturesToGenerate: {
            fieldBackground: {
                width: 600,
                height: 600,
                type: 'rect',
                color: '0xbbada0'
            },
            baseCell: {
                width: 64,
                height: 64,
                type: 'rect',
                color: '0xFFFFFF'
            }
        },

        events: [
            {
                subscribeTo: {
                    componentName: 'InteractiveLayer',
                    eventName: 'userSwipe',
                    type: 'on'
                },
                use: {
                    callbackName: 'onUserSwipe',
                }
            }
        ]
    }
});
