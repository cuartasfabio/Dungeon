class Bomba extends Modelo {
    constructor(x, y) {
        super(imagenes.bomba, x, y);
        this.ruta_gui = imagenes.bomba_gui;
        this.timer = 60;
        this.explotado = false;
    }

    actualizar(){
        this.timer--;
        if(this.timer < 0){
            this.explotado = true;
        }
    }
}