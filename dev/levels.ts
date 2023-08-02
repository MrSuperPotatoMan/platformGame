import Block from "./classes/Block.js"

type Level = {
    width: number,
    height: number,
    blocks: Block[],
    obstacles: Block[],
    spawn: Vector,
    finish: Vector
}

type LevelDeconstructed = {
    width: number,
    height: number,
    blocks: BlockDeconstructed[],
    obstacles: BlockDeconstructed[],
    spawn: Vector,
    finish: Vector
}


type Vector = [number,number]

type Rect = [Vector,Vector,Vector,Vector]

type BlockDeconstructed = {
    width: number,
    height: number,
    position: Vector,
    spritesheet: {
        cols: number,
        rows: number,
        src: string,
        position?: Vector,
        fps: number
    }
}
const Water = {
    width:block(1),
    height:block(1),
    spritesheet:{
        cols:4,rows:4,src:'./imgs/water.png',fps:12
    }
}
const newBlock = {
    width:block(1),
    height:block(1),
    spritesheet:{
        cols:3,rows:4,src:'./imgs/test.png',fps:12,position:[-2,-2] as Vector
    }
}
const LEVELS: LevelDeconstructed[] = [
    {
        width: 2000,
        height: 720,
        blocks: [
            {...newBlock,position:[block(34),500] as Vector}
        ] as BlockDeconstructed[],
        obstacles: [

        ] as BlockDeconstructed[],
        spawn: [60,400],
        finish: [60,70]
    }
]
for(let i = 0;i < LEVELS[0].width;i += block(1)){
    LEVELS[0].obstacles.push({
        ...Water,
        position: [i,block(22)]
    })
}
for(let i = 0;i < 30;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(i),500] as Vector}
    )
}
for(let i = 42;i < 56;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(i),500] as Vector}
    )
}
for(let i = 0;i < 10;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(17),block(i + 3)] as Vector}
    )
}
for(let i = 0;i < 13;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(24),block(i + 3)] as Vector}
    )
}
for(let i = 0;i < 4;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(25 + i),block(3)] as Vector}
    )
}
for(let i = 0;i < 4;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(38 + i),block(10)] as Vector}
    )
}
for(let i = 0;i < 10;i += 1){
    LEVELS[0].blocks.push(
        {...newBlock,position:[block(38),block(i)] as Vector}
    )
}

export default LEVELS;
export {Rect,Vector,Level,LevelDeconstructed,BlockDeconstructed}