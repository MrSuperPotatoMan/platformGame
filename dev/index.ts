import LevelController from "./classes/LevelController.js";
// import MENU,{Menu} from "./menu.js";
import LEVELS from "./levels.js";


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
// ctx.scale(2,2)
const scale = 1.5
// ctx.scale(scale,scale)
class GameController{
    constructor(ctx: CanvasRenderingContext2D){
        this.#ctx = ctx
        this.#levelController = new LevelController(this.#ctx,LEVELS[0],this.#restart.bind(this))
    }
    // setLevel(index:number){
    //     this.#levelController = new LevelController(this.#ctx,LEVELS[index],this.#restart.bind(this))
    // }
    #ctx;
    #levelController
    #restart(){
        this.#levelController = new LevelController(this.#ctx,LEVELS[0],this.#restart.bind(this))
    }
}

new GameController(ctx)