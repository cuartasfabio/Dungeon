// Canvas y contexto del Canvas
var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var escaladoMinimo = 1;



// Capas
var gameLayer;
// Dimensiones
var salasx = 9;
var salasy = 7;
var ancho = 3;
var alto = 3;

// Controles
var controles = {}; // {} Crea un objeto


// Inicio capas y bucle del juego
function iniciarJuego() {
    gameLayer = new GameLayer();
    setInterval(loop, 1000 / 30);
}

//iniciarJuego();

function loop(){
    console.log("loop - ")
    gameLayer.actualizar();
    gameLayer.procesarControles()
    gameLayer.dibujar();
}

// Cambio de escalado
window.addEventListener('load', this.resize, false);

function resize() {
    console.log("Resize")
    var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
    var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

    //Se queda con el menor de los escalados
    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = this.canvas.width*escaladoMinimo;
    canvas.height = this.canvas.height*escaladoMinimo;

    contexto.scale(escaladoMinimo,escaladoMinimo);
}
