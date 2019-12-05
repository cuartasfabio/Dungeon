class Llave extends Modelo {
    constructor(x, y) {
        super(imagenes.llave, x, y);

        this.ruta_gui = imagenes.llave_gui;
    }

    usarItem(){
        //abre una puerta que esté cerrada si el jugador este enfrente de ella
        for(let i = 0; i < gameLayer.puertas.length; i++){
            //Si el jugador está el lado de una puerta CON LLAVE y CERRADA
            if(gameLayer.puertas[i].tieneLlave && !gameLayer.puertas[i].estaAbierta) {
                if (Math.sqrt(Math.pow(gameLayer.puertas[i].x - gameLayer.jugador.x, 2) + Math.pow(gameLayer.puertas[i].y - gameLayer.jugador.y, 2)) < 16) {
                    //abrir la puerta
                    gameLayer.puertas[i].estaAbierta = true;
                    return true;
                }
            }
        }
        console.log("No puedes usar esto aquí!");
        return false;
    }
}