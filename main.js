
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

    /**
     * Getter de los elementos (barras y bola)
     */
    self.Board.prototype = {
        get elements() {
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();

/**
 * Se implementa el prototipo para crear las barras
 */
(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle"
    }

    /**
     * Se declaran los métodos para subir y bajar las barras
     */
    self.Bar.prototype = {
        down: function () {

        },
        up: function () {

        }
    }

})();


/**
 * Función anónima para crear un elemento canvas (elemento de dibujo)
 * sobre el cual mostrar el tablero
 */
(function () {
    // Protoripo para instanciar el canvas
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d")
    }

    /**
     * Se añade el método para dibujar los elementos en el canvas
     */
    self.BoardView.prototype = {
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                draw(this.ctx, el)
            }
        }
    }

    /**
     * Función auxiliar para dibujar los elementos, no hace parte del protoripo BoardView
     */
    function draw(ctx, element) {
        if (element !== null && element.hasOwnProperty("kind"))
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }
    }

})();

/**
 * Ejecutar la función main al cargar la ventana
 * Se define el tamaño del tablero al intanciar un Board y se instancia el BoardView (canvas)
 */
self.addEventListener("load", main);

function main() {
    /**
     * Se define el tamaño del table
     */
    var board = new Board(800, 400);
    var bar = new Bar(0, 100, 40, 100, board);
    var bar = new Bar(760, 20, 40, 100, board);
    var canvas = document.getElementById("canvas");
    var boardView = new BoardView(canvas, board);

    boardView.draw();
}