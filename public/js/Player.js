import Vector from './Vector.js';
import Piece from './Piece.js';

export default class Player {
    constructor(x = 0) {
        this._x = x;
        this._pos = null;
        this._piece = null;
    }

    resetWith(piece) {
        this._piece = piece;
        this._pos = new Vector(this._x, 0);
    }

    drop() {
        this._pos.y++;
    }

    move(isLeft) {
        if (isLeft) {
            this._pos.x--;
        } else {
            this._pos.x++;
        }
    }

    render(context) {
        this._piece.render(context, this._pos);
    }

    get pos() {
        return this._pos;
    }
}