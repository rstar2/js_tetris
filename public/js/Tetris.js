import Timer from './Timer.js';
import Player from './Player.js';
import { PieceT, PieceL } from './Piece.js';

/**
 * Create a "blank" (full with zeros) matrix
 * @param {number} w 
 * @param {number} h 
 */
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(h).fill(0));
    }
    return matrix;
}

/**
 * Merge the "ones" from the Player's piece's matrix into the specified matrix
 * @param {[[]]} matrix 
 * @param {Player} Player
 */
function mergeMatrix(matrix, player) {
    const offsetX = player.pos.x;
    const offsetY = player.pos.y;
    player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
            // if a "one" - put in the arena
            if (value) {
                matrix[y + offsetY][x + offsetX] = value;
            }
        });
    });
}


export default class Tetris {
    constructor(canvas, arenaW, arenaH, scale = 1) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._canvas.width = arenaW * scale;
        this._canvas.height = arenaH * scale;
        this._context.scale(scale, scale);

        this._arena = createMatrix(arenaW, arenaH);

        this._player = new Player(arenaW / 2);

        // start with droping the piece on every 1 sec
        this._timer = new Timer({
            update: this._update.bind(this), render: this._render.bind(this)
        }, 1);


        document.addEventListener('keydown', event => this._handleKeydown(event));
    }

    start() {
        this._generatePiece();

        this._timer.start();
    }

    _generatePiece() {
        const piece = new PieceT();
        this._player.resetWith(piece);
    }

    _update() {
        this._player.drop();
    }

    _render() {
        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._player.render(this._context);
    }

    _handleKeydown(event) {
        if (event.keyCode === 37) {
            this._player.move(true);
        } else if (event.keyCode === 39) {
            this._player.move(false);
        } else if (event.keyCode === 40) {
            // TODO: cancel next "update-drop" while using the keys
            // in order not to get an additional drop right after the keydown event
            this._player.drop();

            this._render();
        }
    }


}