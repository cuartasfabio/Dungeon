class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.inventario = new Map();

        // Cadencia bomba
        this.cadenciaBomba = 30;
        this.tiempoParaColocarBomba = 0;

    }

    actualizar(){
        // Tiempo Disparo
        if ( this.tiempoParaColocarBomba > 0 ) {
            this.tiempoParaColocarBomba--;
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    colocarBomba(){
        if ( this.tiempoParaColocarBomba == 0) {
            // reiniciar Cadencia
            this.tiempoParaColocarBomba = this.cadenciaBomba;
            return new Bomba(this.x, this.y);
        } else {
            return null;
        }
    }


    moverX (direccion){
        this.vx = direccion * 1;
    }

    moverY (direccion){
        this.vy = direccion * 1;
    }

}
