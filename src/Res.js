// Lista re recursos a precargar
var cache = [];
var imagenes = {
    fondo : "res/fondo.png",
    suelo : "res/suelo.png",
    pared : "res/pared.png",
    jugador : "res/jugador.png",
    escaleras : "res/escaleras.png",
    bomba : "res/bomba.png",
    llave : "res/llave.png",
    espada : "res/espada.png",
    marco_gui : "res/marco_gui.png",
    corazon : "res/corazon.png",
    bomba_gui : "res/bomba_gui.png",
    llave_gui : "res/llave_gui.png",
    espada_gui : "res/espada_gui.png",
    corazon_gui : "res/corazon_gui.png",
    puerta_cerrada : "res/puerta_cerrada.png",
    puerta_abierta : "res/puerta_abierta.png",
    puerta_cerrada_v : "res/puerta_cerrada_v.png",
    puerta_abierta_v : "res/puerta_abierta_v.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
