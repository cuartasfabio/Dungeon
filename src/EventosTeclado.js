var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);
//window.addEventListener('keypress', onKeyPress, false);

function onKeyDown( event) {
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);

        switch ( event.keyCode ){
            case 32:
                controles.usarItem = true;
                break;
            case 87:
                controles.moverY = 1;
                break;
            case 83:
                controles.moverY = -1;
                break;
            case 68:
                controles.moverX = 1;
                break;
            case 65:
                controles.moverX = -1;
                break;
            case 39:
                controles.moverInventario = 1;
                break;
            case 37:
                controles.moverInventario = -1;
                break;

        }

    }

}

//Detecta la pulsacion de la tecla una sola vez
// function onKeyPress( event) {
//     var posicion = teclas.indexOf(event.keyCode);
//     if ( posicion == -1 ) {
//         teclas.push(event.keyCode);
//
//         switch ( event.keyCode ){
//             case 39:
//                 controles.moverInventario = 1;
//                 break;
//             case 37:
//                 controles.moverInventario = -1;
//                 break;
//         }
//
//         //teclas.splice( posicion, 1);
//
//     }
// }

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);

    switch ( event.keyCode ){
        case 32:
            controles.usarItem = false;
            break;
        case 87:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 83:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 68:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 65:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
        case 39:
            if ( controles.moverInventario == 1 ) {
                controles.moverInventario = 0;
                gameLayer.yaSeHaMovidoEnEsteEvento = false;         //No se deberia de meter codigo del gameLayer en los
            }                                                       //eventos de teclado pero no se me ocurre otra forma
            break;                                                  //de que ejecute la accion 1 vez por evento.
        case 37:
            if ( controles.moverInventario == -1 ) {
                controles.moverInventario = 0;
                gameLayer.yaSeHaMovidoEnEsteEvento = false;
            }
            break;
    }

}
