import Block from "./Block.js";
import Sprite from "./Sprite.js";
export default class Character extends Block {
    constructor(position) {
        const spritesheet = {
            cols: 3, rows: 2, src: './imgs/character.png', fps: 24
        };
        super({ width: CHARACTER_WIDTH, height: CHARACTER_HEIGHT, position: position, spritesheet });
        this.#spriteList = {
            "idle": this.sprite,
            "hold": new Sprite('./imgs/hold.png', 2, 3, 24, this.position, [-1, 0]),
            "jump": new Sprite('./imgs/character.png', 2, 3, 24, this.position),
            "fall": new Sprite('./imgs/character.png', 2, 3, 24, this.position),
            "airHold": new Sprite('./imgs/character.png', 2, 3, 24, this.position),
            "walk": new Sprite('./imgs/character.png', 2, 3, 24, this.position)
        };
    }
    #spriteList;
    velocity = [0, 0];
    #state = "idle";
    #direction = 1;
    get state() {
        return this.#state;
    }
    set state(n) {
        this.#state = n;
        this.sprite = this.#spriteList[n];
    }
    accerelate(v) {
        this.velocity[X] += v[X];
        if (Math.abs(this.velocity[X]) > CHARACTER_MAX_HORIZONTAL_VELOCITY) {
            this.velocity[X] = CHARACTER_MAX_HORIZONTAL_VELOCITY * Math.sign(this.velocity[X]);
        }
        this.velocity[Y] += v[Y];
        if (Math.abs(this.velocity[Y]) > CHARACTER_MAX_VERTICAL_VELOCITY) {
            this.velocity[Y] = CHARACTER_MAX_VERTICAL_VELOCITY * Math.sign(this.velocity[Y]);
        }
        if (this.velocity[X] > 0) {
            this.#direction = 1;
        }
        else if (this.velocity[X] < 0) {
            this.#direction = -1;
        }
    }
    drawCharacter(ctx, time, shift) {
        this.draw(ctx, time, shift, this.#direction);
    }
    move(d) {
        this.position[X] += d[X];
        this.position[Y] += d[Y];
    }
}
