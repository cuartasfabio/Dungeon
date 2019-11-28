class Fondo extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y)

        this.vx = 0;
    }

    actualizar(){
        if(this.vx != 0){
            if(this.fondoAux == null){
                this.fondoAux = new Fondo(this.imagen.src,this.x,this.y);
            }

            this.x = this.x + this.vx;

            if(this.x + this.ancho/2 < 0){
                this.x = 480 + this.ancho/2;
            }

            if(this.x - this.ancho/2 > 480){
                this.x = 0 -this.ancho/2;
            }
        }
    }

    dibujar(){
        super.dibujar();

        if(this.fondoAux != null){
            if(this.x -this.ancho/2 >0){
                this.fondoAux.x = this.x -this.ancho;
            }

            if(this.x + this.ancho/2 < 480){
                this.fondoAux.x= this.x +this.ancho;
            }

            this.fondoAux.dibujar();
        }
    }


}
