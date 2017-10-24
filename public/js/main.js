import Timer from './Timer.js';
import { PieceT, PieceL } from './Piece.js';
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.scale(20, 20);

const player = {
    piece: new PieceT(),
    pos: { x: 0, y: 0 }
};

// start with droping the piece on every 1 sec
let dropInterval = 1;

function update() {
    player.pos.y++;
}

function render() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.piece.render(context, player.pos);
}

const timer = new Timer({
    update, render: render.bind(this, context)
}, dropInterval);

timer.start();