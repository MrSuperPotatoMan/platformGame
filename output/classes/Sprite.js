export default class Sprite {
    constructor(src, rows, cols, fps, position, spritePosition = [0, 0]) {
        this.#position = position;
        this.#spritePosition = spritePosition;
        this.#spritesheet.src = src;
        this.#rows = rows;
        this.#cols = cols;
        this.#fps = fps;
        this.#frame = (function* (rows, cols) {
            while (true) {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        yield [j, i];
                    }
                }
            }
        })(this.#rows, this.#cols);
    }
    #rows;
    #cols;
    #fps;
    #position;
    #frame;
    #spritesheet = new Image();
    #prevTime = 0;
    #prevXY = [0, 0];
    #spritePosition;
    draw(ctx, time, direction = 1, shift) {
        ctx.scale(direction, 1);
        if (time + this.#prevTime < 1000 / this.#fps) {
            this.#prevTime += time;
            ctx.drawImage(this.#spritesheet, (this.#spritesheet.width / this.#cols) * this.#prevXY[X], (this.#spritesheet.height / this.#rows) * this.#prevXY[Y], this.#spritesheet.width / this.#cols, this.#spritesheet.height / this.#rows, direction * (this.#position[X] + this.#spritePosition[X]) + (shift[X] * direction), this.#position[Y] + this.#spritePosition[Y] + (shift[Y] * direction), direction * (this.#spritesheet.width / this.#cols), (this.#spritesheet.height / this.#rows));
        }
        else {
            this.#prevTime -= 1000 / this.#fps;
            const [x, y] = this.#frame.next().value;
            this.#prevXY = [x, y];
            ctx.drawImage(this.#spritesheet, (this.#spritesheet.width / this.#cols) * x, (this.#spritesheet.height / this.#rows) * y, this.#spritesheet.width / this.#cols, this.#spritesheet.height / this.#rows, direction * (this.#position[X] + this.#spritePosition[X]) + (shift[X] * direction), this.#position[Y] + this.#spritePosition[Y] + (shift[Y] * direction), direction * (this.#spritesheet.width / this.#cols), (this.#spritesheet.height / this.#rows));
        }
        ctx.scale(direction, 1);
    }
}
