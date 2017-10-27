/**
 * Create a "blank" (full with zeros) matrix
 * @param {number} width 
 * @param {number} height 
 */
export function create(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

/**
 * Merge the "ones" from the Player's piece's matrix into the specified matrix
 * @param {[[]]} matrix 
 * @param {Player} Player
 */
export function merge(matrix, player) {
    const offsetX = player.pos.x;
    const offsetY = player.pos.y;

    const piece = player.piece;
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            // if a "one" - put in the arena
            if (value !== 0) {
                matrix[y + offsetY][x + offsetX] = value;
            }
        });
    });
}

/**
 * Check if the player's piece's matrix is colliding with the main matrix
 * or goes out of bounds - e.g. reach bottom, or left/right borders
 * @param {[[]]} matrix 
 * @param {Player} Player
 */
export function isCollide(matrix, player) {
    const offsetX = player.pos.x;
    const offsetY = player.pos.y;

    const piece = player.piece;

    for (let y = 0, lenRows = piece.length; y < lenRows; y++) {
        for (let x = 0, lenCols = piece[y].length; x < lenCols; x++) {
            // check first if the piece's matrix (e.g. how it is rotated)
            if (piece[y][x] !== 0) {
                // now check if the main matrix/arena has a "one" in that posistion
                const matrixRow = matrix[y + offsetY];
                // we also check if matrixRow is valid row as after the offset it may not be
                // e.g. it can be "below" the end of the matrix/arena, which in fact means bottom is reached
                // Note matrixRow[x + offsetX] will be 'undefined' and ths '!== 0' if offsetX is making
                // row to be not in the arena entirely (e.g. over the left/right borders)
                if (!matrixRow || matrixRow[x + offsetX] !== 0) {
                    // so bottom is reach or there's a collision
                    return true;
                }
            }
        }
    }

    return false;
}


/**
 * @param {[[]]} matrix
 * @param {boolean} isLeft
 */
export function rotate(matrix, isLeft) {
    // ROTATE = 1.Traspose + 2.Reverse
    
    // 1.Traspose
    // slice diagonaly the matrix 
    for (let y = 0, lenRows = matrix.length; y < lenRows; y++) {
        for (let x = 0; x < y; x++) {
            // ES6 swapping without the need of extra temp variable
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ];
        }
    }

    // 2.Reverse
    if (isLeft) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

/**
 * @param {[[]]} matrix 
 * @param {CanvasRenderingContext2D} context 
 * @param {Sring} color 
 * @param {{x: number, y: number}} offset 
 */
export function render(matrix, context, color = 'white', offset = { x: 0, y: 0 }) {
    context.fillStyle = color;
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

