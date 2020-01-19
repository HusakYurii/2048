import CONFIG from './configs/gameConfig.js';
import Game from './game/index.js'
import Field from './components/field/index.js';
import InteractiveLayer from './components/interactive/index.js';

/** Create an instance of application */
const game = Game.create(CONFIG);

/** Register raw component */
game.registerComponent([Field, InteractiveLayer]);

/** Init all components with data */
game.init();

/** Run an application */
game.run();