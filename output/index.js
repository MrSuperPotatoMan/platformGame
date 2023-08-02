import LevelController from "./classes/LevelController.js";
import LEVELS from "./levels.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const scale = 1.5;
class GameController {
    constructor(ctx) {
        this.#ctx = ctx;
        this.#levelController = new LevelController(this.#ctx, LEVELS[0], this.#restart.bind(this));
    }
    #ctx;
    #levelController;
    #restart() {
        this.#levelController = new LevelController(this.#ctx, LEVELS[0], this.#restart.bind(this));
    }
}
new GameController(ctx);
