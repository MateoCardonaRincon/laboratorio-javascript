
/**
 * Función anónima para crear el TABLERO a través de un prototipo Board
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
            var elements = this.bars.map((bar) => bar);
            elements.push(this.ball);
            return elements;
        }
    }
})();


/**
 * Función anónima que implementa el prototipo Bar para crear las barras
 */
(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }

    /**
     * Se implementan los métodos para subir y bajar las barras
     */
    self.Bar.prototype = {
        down: function () {
            this.y += this.speed;
        },
        up: function () {
            this.y -= this.speed;
        },
        toString: function () {
            return "x:" + this.x + " y:" + this.y
        }

    }

})();


(function () {
    self.Ball = function (x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = 3;
        this.speedY = 0;
        this.board = board;
        this.kind = "circle";

        board.ball = this;
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
        /**
         * Limpiar el canvas dentro del área especificada, en este caso, el rectángulo que forma el tablero
         */
        clean: function () {
            this.ctx.clearRect(0, 0, board.width, board.height);
        },
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                draw(this.ctx, el)
            }
        },
        play: function () {
            this.clean();
            this.draw();
        }
    }

    /**
     * Función auxiliar para dibujar los elementos, no hace parte del protoripo BoardView
     */
    function draw(ctx, element) {
        switch (element.kind) {
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 7)
                ctx.fill();
                ctx.closePath();
                break;
        }

    }

})();


/*
* Se generan las instancias en el scope global para poder accederlas desde cualquier
* parte del código.
* Se define el tamaño del tablero al intanciar un Board y se instancia el BoardView (canvas)
 * También se instancian las dos barras pasando sus parámetros en el constructor
 */
var board = new Board(800, 400);
var bar1 = new Bar(0, 100, 40, 100, board);
var bar2 = new Bar(760, 20, 40, 100, board);
var canvas = document.getElementById("canvas");
var boardView = new BoardView(canvas, board);
var ball = new Ball(300, 50, 10, board)

/**
 * Se agrega un evento para detectar si se presionaron las teclas "ArrowUp" o "ArrowDown"
 * para la barra bar1, o si se presionan las teclas "w" o "s" para mover la barra bar2
 */
document.addEventListener("keydown", function (ev) {
    if (ev.code === "ArrowUp") {
        bar1.up();
    } else if (ev.code === "ArrowDown") {
        bar1.down();
    } else if (ev.code === "KeyW") {
        bar2.up();
    } else if (ev.code === "KeyS") {
        bar2.down();
    }
});



self.addEventListener("load", controller);

/**
 * Ejecutar la función controller al cargar la ventana
 * Se define el tamaño del tablero al intanciar un Board y se instancia el BoardView (canvas)
 * También se instancian las dos barras pasando sus parámetros en el constructor
 */
function controller() {
    boardView.play();
    /**
     * Esta línea se usa para refrescar el canvas y actualizar la vista de las barras y la bola
     */
    window.requestAnimationFrame(controller);
}