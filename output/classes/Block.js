import Box from "./Box.js";
import Sprite from "./Sprite.js";
export default class Block extends Box {
    constructor({ width, height, position, spritesheet }) {
        super(width, height);
        this.#position = position;
        this.#image.src = spritesheet.src;
        const spritePosition = spritesheet.position != undefined ? spritesheet.position : [0, 0];
        this.sprite = new Sprite(spritesheet.src, spritesheet.rows, spritesheet.cols, spritesheet.fps, position, spritePosition);
    }
    #image = new Image();
    sprite;
    #position;
    get position() {
        return this.#position;
    }
    draw(ctx, time, shift, direction) {
        this.sprite.draw(ctx, time, direction, shift);
        if (SHOW_HITBOXES) {
            ctx.strokeStyle = '#000';
            ctx.strokeRect(this.#position[X] + shift[X], this.#position[Y] + shift[Y], this.width, this.height);
        }
    }
}
