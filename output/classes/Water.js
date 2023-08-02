import Block from "./Block.js";
export default class Water extends Block {
    constructor(position) {
        super({ width: block(1), height: block(1), position: position, spritesheet: { src: "./imgs/water.png", cols: 3, rows: 3, fps: 12 } });
    }
}
