// Lista re recursos a precargar
var cache = [];
var imagenes = {
    fondo : "res/fondo.png",
    suelo : "res/suelo.png",
    pared : "res/pared.png",
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
