export class Piece {
    constructor(matrix, color) {
        this._matrix = matrix;
        this._color = color;
    }

    update() {

    }

    rotate() {
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {{x:number, y:number}} offset 
     */
    render(context, offset = { x: 0, y: 0 }) {
        context.fillStyle = this._color;
        this._matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1, 1);
                }
            });
        });
    }
}
export default Piece;


export class PieceT extends Piece {
    constructor() {
        super(MATRIX_T, 'red');
    }
}

export class PieceL extends Piece {
    constructor() {
        super(MATRIX_L, 'yellow');
    }
}


export const MATRIX_T = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];

export const MATRIX_L = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];

export const MATRIX_J = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
];

export const MATRIX_O = [
    [1, 1],
    [1, 1]
];


export const MATRIX_S = [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0]
];

export const MATRIX_Z = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];

export const MATRIX_I = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
];