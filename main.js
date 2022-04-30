
/**
 * Función anónima para crear el tablero a través de un prototipo Board
 * Además de sus propiedades.
*/
(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.gamaOver = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements() {
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();

/**
 * Función anónima para crear un elemento canvas (elemento de dibujo)
 * sobre el cual mostrar el tablero
 */

(function () {
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d")
    }
})();

/**
 * Ejecutar la función main al cargar la ventana
 * Se define el tamaño del tablero al intanciar un Board y se instancia el BoardView (canvas)
 */
window.addEventListener("load", main);

function main() {
    /**
     * Se define el tamaño del table
     */
    var board = new Board(800, 400);
    var canvas = document.getElementById("canvas");
    var boardView = new BoardView();
}