# Platform game

## What is it?
My project for learning purposes.


Although you might look into if you look for simple platformer game engine.
...or contribute on levels
...or sprites
...or anything else.


## How to play?

Just open `index.html` file. Then move via `w`, `s`, `a`, `d` (You can also make wall jumps).

Game doesn't have any finish point for now.

## For level contributors

The levels are stored in one array `LEVELS` in `level.ts`.

The levels are deconstructed (and then compiled in engine) and the structure looks like this:

```javascript
type LevelDeconstructed = {
    width: number,
    height: number,
    blocks: BlockDeconstructed[],
    obstacles: BlockDeconstructed[],
    spawn: Vector,
    finish: Vector
}

type Vector = [number,number]
```
The game is based in 2d canvas with [0,0] point located in top-left corner.

Width and height seems obvious. It's number of pixels representing level area. If character goes beyond that, it dies. It's also nessecary for proper camera work.

Spawn point also is what name suggest. It's point represented by vector where character starts level. **Be aware** that this point it's charater top-left corner which is 20 pixels by 32 pixels.

Finish will be point where LevelController closes level and loads next level from `LEVELS` array.

Blocks and obstacles are structually same thing, with one diffence. Character when conliding with obstacle will die and lever will restart.

### Deconstructed block 

```javascript
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
```

All blocks are rectangles with static (for now) width, height and position. Same as with character the position represents top-left corner of a block. Those parameters are responsible for block hitbox.

To avoid invicible walls you shoud make spritesheet or at least one static image of your block.

In one static image case you just need cols, rows and fps set to 0. Otherwise fill those parameters based on your spritesheet.

Position is texture offset from block hitbox. For example `position: [-1,0]` will draw spritesheet one pixel to the left from hitbox. If set to [0,0] (or empty) texture will be drawn from `BlockDeconstructed.position` point.

**Note:** fps parameter cannot go any further that 60. Else, it won't make any diffrence.

Complete level either add to `LEVELS` array and set it in `index.ts` or add it directly to `new levelController` as second argument.
