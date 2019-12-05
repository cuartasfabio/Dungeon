class BombaItem extends Modelo {
    constructor(x, y) {
        super(imagenes.bomba_item, x, y);
        this.ruta_gui = imagenes.bomba_gui;
    }

    usarItem(){
        // crea una bomba en la posicion del jugador
        var bomba = new Bomba(gameLayer.jugador.x, gameLayer.jugador.y);
        // la guarda en gamLayer
        gameLayer.bombas.push(bomba);
        return true;
    }
}