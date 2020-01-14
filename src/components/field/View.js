import { View } from '../../../libs/component/View.js';
import { UIBuilder } from '../../../libs/UIBuilder.js';
import { EmptyCell } from './ui/EmptyCell.js';

export default class extends View {
    constructor() {
        super();
    }

    createFiledBg({ width, height }) {
        const background = UIBuilder.createSprite({
            texture: this.assets['fieldBackground'],
            modifiers: { anchor: { x: 0.5, y: 0.5 } }
        });

        background.width = width;
        background.height = height;

        this.addChild(background);
    }

    createFieldBgCells(gridConfig) {
        const texture = this.assets['baseCell'];

        const cells = gridConfig.reduce((acc, gridRow) => {
            const collection = gridRow.map(params => this.createCell(texture, params));
            return [...acc, ...collection];
        }, []);

        this.addChild(...cells);
    }

    createCell(texture, params) {
        const Constructor = params.type === 0 ? EmptyCell : class { };
        const cell = new Constructor(texture, params);
        cell.position.set(params.x, params.y);

        return cell;
    }
}
