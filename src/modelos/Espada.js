class Espada extends Modelo {
    constructor(x, y) {
        super(imagenes.espada, x, y);

        this.ruta_gui = imagenes.espada_gui;
        this.ruta_gui_alfa = imagenes.espada_gui_alfa;
    }

    usarItem(){
        //ataca con la espada
        return false;
    }
}