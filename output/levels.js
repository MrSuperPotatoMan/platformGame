const Water = {
    width: block(1),
    height: block(1),
    spritesheet: {
        cols: 4, rows: 4, src: './imgs/water.png', fps: 12
    }
};
const newBlock = {
    width: block(1),
    height: block(1),
    spritesheet: {
        cols: 3, rows: 4, src: './imgs/test.png', fps: 12, position: [-2, -2]
    }
};
const LEVELS = [
    {
        width: 2000,
        height: 720,
        blocks: [
            { ...newBlock, position: [block(34), 500] }
        ],
        obstacles: [],
        spawn: [60, 400],
        finish: [60, 70]
    }
];
for (let i = 0; i < LEVELS[0].width; i += block(1)) {
    LEVELS[0].obstacles.push({
        ...Water,
        position: [i, block(22)]
    });
}
for (let i = 0; i < 30; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(i), 500] });
}
for (let i = 42; i < 56; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(i), 500] });
}
for (let i = 0; i < 10; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(17), block(i + 3)] });
}
for (let i = 0; i < 13; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(24), block(i + 3)] });
}
for (let i = 0; i < 4; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(25 + i), block(3)] });
}
for (let i = 0; i < 4; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(38 + i), block(10)] });
}
for (let i = 0; i < 10; i += 1) {
    LEVELS[0].blocks.push({ ...newBlock, position: [block(38), block(i)] });
}
export default LEVELS;
