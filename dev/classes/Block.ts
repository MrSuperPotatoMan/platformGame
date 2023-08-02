import Box from "./Box.js";
import { BlockDeconstructed, Vector } from "../levels";
import Sprite from "./Sprite.js";

export default class Block extends Box{
    constructor({width,height,position,spritesheet}:BlockDeconstructed){
        super(width,height);
        this.#position = position
        this.#image.src = spritesheet.src;
        const spritePosition:Vector = spritesheet.position != undefined? spritesheet.position : [0,0]
        this.sprite = new Sprite(spritesheet.src,spritesheet.rows,spritesheet.cols,spritesheet.fps,position,spritePosition)
    }
    #image = new Image();
    sprite;
    #position;
    get position(){
        return this.#position
    }
    draw(ctx:CanvasRenderingContext2D,time:number, shift:Vector,direction?: -1 | 1){
        this.sprite.draw(ctx,time,direction,shift)
        if(SHOW_HITBOXES){
            ctx.strokeStyle = '#000'
            ctx.strokeRect(this.#position[X] + shift[X],this.#position[Y] + shift[Y],this.width,this.height)
        }
    }

}