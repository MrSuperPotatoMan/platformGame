import Block from "./classes/Block.js";
import Character from "./classes/Character.js";
export default class LevelController {
    constructor(ctx, level, deathCallback) {
        this.setLevel(level);
        this.#ctx = ctx;
        this.#character = new Character([...level.spawn]);
        this.#animationFrameId = requestAnimationFrame(this.#animationFrame.bind(this));
        this.keyBind();
        this.#deathCb = deathCallback;
    }
    setLevel(level) {
        this.#level = {
            width: level.width,
            height: level.height,
            blocks: level.blocks.map(val => {
                return new Block(val);
            }),
            spawn: level.spawn,
            obstacles: level.obstacles.map(val => {
                return new Block(val);
            }),
            finish: level.finish
        };
    }
    #deathCb;
    #level;
    #ctx;
    #character;
    prevTime = 0;
    #animationFrame(time) {
        if (!this.#level)
            return;
        if (this.#isDead()) {
            this.#deathCb();
            return;
        }
        this.#ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.#physics();
        const delta = time - this.prevTime;
        this.prevTime = time;
        this.#character.drawCharacter(this.#ctx, delta);
        this.#level.blocks.forEach(el => el.draw(this.#ctx, delta));
        this.#level.obstacles.forEach(el => el.draw(this.#ctx, delta));
        this.#animationFrameId = requestAnimationFrame(this.#animationFrame.bind(this));
    }
    #animationFrameId;
    #physics() {
        if (this.#keys.a)
            this.#character.accerelate([-1, 0]);
        if (this.#keys.d)
            this.#character.accerelate([1, 0]);
        if (this.#keys.w && !this.#keys.wHold && ["walk", "idle", "hold"].includes(this.#character.state)) {
            this.#keys.wHold = true;
            this.#character.velocity[Y] = CHARACTER_JUMP_VELOCITY;
        }
        else if (this.#keys.w && !this.#keys.wHold && this.#character.state === "airHold") {
            this.#keys.wHold = true;
            this.#character.velocity[Y] = CHARACTER_JUMP_VELOCITY;
            this.#character.velocity[X] = CHARACTER_MAX_HORIZONTAL_VELOCITY * this.#character.velocity[X] * -1;
        }
        const signX = Math.sign(this.#character.velocity[X]);
        const signY = Math.sign(this.#character.velocity[Y]);
        const characterCopyX = {
            width: this.#character.width + Math.abs(this.#character.velocity[X]),
            height: this.#character.height,
            position: [
                signX === -1 ? this.#character.position[X] + this.#character.velocity[X] : this.#character.position[X],
                this.#character.position[Y]
            ]
        };
        const distace = {
            up: CHARACTER_MAX_VERTICAL_VELOCITY,
            down: CHARACTER_MAX_VERTICAL_VELOCITY,
            left: CHARACTER_MAX_HORIZONTAL_VELOCITY,
            right: CHARACTER_MAX_HORIZONTAL_VELOCITY,
        };
        this.#level?.blocks.forEach(el => {
            if (characterCopyX.position[X] < el.position[X] + el.width) {
                if (characterCopyX.position[X] + characterCopyX.width > el.position[X]) {
                    if (characterCopyX.position[Y] < el.position[Y] + el.height) {
                        if (characterCopyX.position[Y] + characterCopyX.height > el.position[Y]) {
                            if (Math.abs(el.position[X] - (this.#character.position[X] + this.#character.width)) < distace.right) {
                                distace.right = el.position[X] - (this.#character.position[X] + this.#character.width);
                            }
                            if (Math.abs(this.#character.position[X] - (el.position[X] + el.height)) < distace.left) {
                                distace.left = Math.abs(this.#character.position[X] - (el.position[X] + el.width));
                            }
                        }
                    }
                }
            }
        });
        if (signX === 1 && distace.right < this.#character.velocity[X]) {
            this.#character.velocity[X] = Math.abs(distace.right);
        }
        else if (signX === -1 && -distace.left > this.#character.velocity[X]) {
            this.#character.velocity[X] = -Math.abs(distace.left);
        }
        this.#character.move([this.#character.velocity[X], 0]);
        const characterCopyY = {
            width: this.#character.width,
            height: this.#character.height + Math.abs(this.#character.velocity[Y]),
            position: [
                this.#character.position[X],
                signY === -1 ? this.#character.position[Y] + this.#character.velocity[Y] : this.#character.position[Y]
            ]
        };
        this.#level?.blocks.forEach(el => {
            if (characterCopyY.position[X] < el.position[X] + el.width) {
                if (characterCopyY.position[X] + characterCopyY.width > el.position[X]) {
                    if (characterCopyY.position[Y] < el.position[Y] + el.height) {
                        if (characterCopyY.position[Y] + characterCopyY.height > el.position[Y]) {
                            if (Math.abs(el.position[Y] - (this.#character.position[Y] + this.#character.height)) < distace.down) {
                                distace.down = el.position[Y] - (this.#character.position[Y] + this.#character.height);
                            }
                            if (Math.abs(this.#character.position[Y] - (el.position[Y] + el.height)) < distace.up) {
                                distace.up = Math.abs(this.#character.position[Y] - (el.position[Y] + el.height));
                            }
                        }
                    }
                }
            }
        });
        if (signY === 1 && distace.down < this.#character.velocity[Y]) {
            this.#character.velocity[Y] = Math.abs(distace.down);
        }
        else if (signY === -1 && -distace.up > this.#character.velocity[Y]) {
            this.#character.velocity[Y] = -Math.abs(distace.up);
        }
        if (distace.down === 0) {
            if (distace.right === 0 || distace.left === 0) {
                this.#character.state = "hold";
            }
            else if (this.#character.velocity[X] === 0) {
                this.#character.state = "idle";
            }
            else {
                this.#character.state = "walk";
            }
        }
        else {
            if (distace.right === 0 || distace.left === 0) {
                this.#character.state = "airHold";
            }
            else if (this.#character.velocity[Y] > 0) {
                this.#character.state = "fall";
            }
            else {
                this.#character.state = "jump";
            }
        }
        this.#character.move([0, this.#character.velocity[Y]]);
        this.#character.accerelate([0, GRAVITY]);
        if (this.#character.velocity[X] != 0 && !(this.#keys.a || this.#keys.d)) {
            this.#character.accerelate([-Math.sign(this.#character.velocity[X]) * CHARACTER_STOPING, 0]);
        }
    }
    #isDead() {
        if (this.#character.position[X] < 0 || this.#character.position[Y] < 0) {
            return true;
        }
        if (this.#character.position[X] + this.#character.width > (this.#level?.width || 0) ||
            this.#character.position[Y] + this.#character.height > (this.#level?.height || 0)) {
            return true;
        }
        let test = false;
        this.#level?.obstacles.forEach(el => {
            if (this.#character.position[X] + this.#character.width > el.position[X] &&
                this.#character.position[X] < el.position[X] + el.width &&
                this.#character.position[Y] + this.#character.height > el.position[Y] &&
                this.#character.position[Y] < el.position[Y] + el.height) {
                test = true;
            }
        });
        return test;
    }
    keyBind() {
        document.addEventListener('keydown', this.#handleKeyDown);
        document.addEventListener('keyup', this.#handleKeyUp);
    }
    keyUnbind() {
        document.removeEventListener('keydown', this.#handleKeyDown);
        document.removeEventListener('keyup', this.#handleKeyUp);
    }
    #handleKeyDown = (ev) => {
        const key = ev.key;
        if (key === 'w' || key === 'a' || key === 'd') {
            ev.preventDefault();
            this.#keys[key] = true;
        }
    };
    #handleKeyUp = (ev) => {
        const key = ev.key;
        if (key === 'w' || key === 'a' || key === 'd') {
            ev.preventDefault();
            this.#keys[key] = false;
            if (key === 'w') {
                this.#keys.wHold = false;
            }
        }
    };
    #keys = {
        wHold: false,
        w: false,
        a: false,
        d: false
    };
    end() {
        cancelAnimationFrame(this.#animationFrameId);
        this.keyUnbind();
    }
}
