import Timer from './Timer.js';
import Player from './Player.js';
import { PieceT, PieceL } from './Piece.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

// we have the game arena as 12x20 matrix tiles
// wih scale of 20 this means 240x400 pixels canvas
const ARENA_WIDTH = 12;
const ARENA_HEIGTH = 20;
const SCALE = 20;
canvas.width = ARENA_WIDTH * SCALE;
canvas.height = ARENA_HEIGTH * SCALE;
context.scale(SCALE, SCALE);

// create a "blank" (full with zeros) matrix
const arena = ((w, h)=> {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(h).fill(0));
    }
    return matrix;
})(ARENA_WIDTH, ARENA_HEIGTH);

const player = new Player(ARENA_WIDTH / 2);
player.resetWith(new PieceT());

function update() {
    player.drop();
}

function render() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.render(context);
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        player.move(true);
    } else if (event.keyCode === 39) {
        player.move(false);
    } else if (event.keyCode === 40) {
        player.drop();

        render();
    }
});

// start with droping the piece on every 1 sec
const timer = new Timer({
    update, render: render.bind(this, context)
}, 1);

timer.start();