import * as matrix from './matrix.js';
import Timer from './Timer.js';
import Player from './Player.js';
import { PIECES } from './pieces.js';

export default class Tetris {
    constructor(canvas, arenaW, arenaH, scale = 1) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._canvas.width = arenaW * scale;
        this._canvas.height = arenaH * scale;
        this._context.scale(scale, scale);

        this._arena = matrix.create(arenaW, arenaH);

        this._player = new Player(arenaW / 2);

        // start with droping the piece on every 1 sec
        this._timer = new Timer({
            update: this._drop.bind(this), render: this._render.bind(this)
        }, 1, false);

        document.addEventListener('keydown', event => this._handleKeydown(event));
    }

    start() {
        this._generatePiece();

        this._render();

        this._timer.start();
    }

    _generatePiece() {
        // generate a new random piece
        const rand = Math.floor(Math.random() * PIECES.length);
        this._player.resetWith(PIECES[rand], 'red');
    }

    _drop() {
        // mkake drop
        this._player.drop(1);

        // check for bottom reached or collision
        if (matrix.isCollide(this._arena, this._player)) {
            // if yes - then revert the last "collision drop"
            this._player.drop(-1);

            // merge the piece with the arena
            matrix.merge(this._arena, this._player);

            // TODO: check for Tetris, e.g. clear full lines and increase points

            // TODO: check for Game Over

            // generate a new piece for the player - it will be also started form the top
            this._generatePiece();
        }
    }

    _move(isLeft) {
        this._player.move(isLeft ? -1 : 1);
        if (matrix.isCollide(this._arena, this._player)) {
            // reached the left/right borders
            this._player.move(isLeft ? 1 : -1);
        }
    }

    _rotate(isLeft) {
        matrix.rotate(this._player.piece, isLeft);

        // check for collision - 
        let offset = 1;
        while (matrix.isCollide(this._arena, this._player)) {
            // reached the left/right borders
            this._player.move(isLeft ? 1 : -1);
        }
    }

    _render() {
        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        // render the arena (current fallen pieces)
        matrix.render(this._arena, this._context);

        // render the player (current falling piece)
        matrix.render(this._player.piece, this._context, this._player.color, this._player.pos);
    }

    _handleKeydown(event) {
        switch (event.keyCode) {
            case 37:   // left
                this._move(true);
                break;
            case 39:   // right
                this._move(false);
                break;
            case 81:   // q
                this._rotate(true);
            case 87:   // w
                this._rotate(false);
                break;
            case 40:  // down
                // cancel next "update-drop" while using the keys
                // in order not to get an additional drop right after the keydown event

                // TODO: allow resetting the accumulated time
                this._drop();
                break;

        }
    }


}