import { Vector } from "../levels";

export default class Sprite{
    constructor(src: string,rows:number,cols:number,fps:number,position:Vector,spritePosition:Vector = [0,0]){
        this.#position = position;
        this.#spritePosition = spritePosition
        this.#spritesheet.src = src;
        this.#rows = rows;
        this.#cols = cols;
        this.#fps = fps;
        this.#frame = (function*(rows:number,cols:number){
            while (true){
                for(let i = 0;i < rows ;i++){
                    for(let j = 0;j < cols;j++){
                        yield [j,i]
                    }
                }
            }
        })(this.#rows,this.#cols)
    }
    #rows;
    #cols;
    #fps;
    #position;
    #frame;
    #spritesheet = new Image();
    #prevTime = 0;
    #prevXY = [0,0]
    #spritePosition;

    draw(ctx:CanvasRenderingContext2D,time:number,direction:-1 | 1 = 1,shift:Vector){
        ctx.scale(direction, 1);
        if(time + this.#prevTime < 1000 / this.#fps){
            this.#prevTime += time;
            ctx.drawImage(this.#spritesheet,
                (this.#spritesheet.width/this.#cols) * this.#prevXY[X], //cut x
                (this.#spritesheet.height/this.#rows) * this.#prevXY[Y], // cut y
                this.#spritesheet.width/this.#cols, // cut width
                this.#spritesheet.height/this.#rows, // cut height
                direction * (this.#position[X] + this.#spritePosition[X]) + (shift[X] * direction),this.#position[Y] + this.#spritePosition[Y] + (shift[Y] * direction),
                direction * (this.#spritesheet.width/this.#cols),(this.#spritesheet.height/this.#rows) // placement width & height
            )
        }else{
            this.#prevTime -= 1000/this.#fps
            const [x,y] = this.#frame.next().value
            this.#prevXY = [x,y];

            ctx.drawImage(
                this.#spritesheet, // img
                (this.#spritesheet.width/this.#cols) * x, //cut x
                (this.#spritesheet.height/this.#rows) * y, // cut y
                this.#spritesheet.width/this.#cols, // cut width
                this.#spritesheet.height/this.#rows, // cut height
                direction * (this.#position[X] + this.#spritePosition[X]) + (shift[X] * direction),this.#position[Y] + this.#spritePosition[Y] + (shift[Y] * direction), // place x & y
                direction * (this.#spritesheet.width/this.#cols),(this.#spritesheet.height/this.#rows) // placement width & height
            )
        }
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(direction,1)
    }
}