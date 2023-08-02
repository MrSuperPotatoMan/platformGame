const X = 0;
const Y = 1;
// screen size
const SCREEN_WIDTH = 1280 ;
const SCREEN_HEIGHT = 720 ;
// character
const CHARACTER_WIDTH = 20;
const CHARACTER_HEIGHT = 32;

// character scarfd
const SCARF_MAX_VELOCITY = 5
//
const block = (size:number) => {
    return size * 32
}
const CHARACTER_MAX_HORIZONTAL_VELOCITY = 10;
const CHARACTER_MAX_VERTICAL_VELOCITY = 10;
const CHARACTER_JUMP_VELOCITY = -10;

// forces
const GRAVITY = 0.5;
const CHARACTER_STOPING = 1;
// dev tools
const SHOW_HITBOXES = false;