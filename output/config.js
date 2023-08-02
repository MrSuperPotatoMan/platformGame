"use strict";
const X = 0;
const Y = 1;
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;
const CHARACTER_WIDTH = 20;
const CHARACTER_HEIGHT = 32;
const SCARF_MAX_VELOCITY = 5;
const block = (size) => {
    return size * 32;
};
const CHARACTER_MAX_HORIZONTAL_VELOCITY = 10;
const CHARACTER_MAX_VERTICAL_VELOCITY = 10;
const CHARACTER_JUMP_VELOCITY = -10;
const GRAVITY = 0.5;
const CHARACTER_STOPING = 1;
const SHOW_HITBOXES = false;
