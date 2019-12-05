class Puerta extends Modelo {
    constructor(conLlave,rutaImagen,x,y) {
        super(rutaImagen, x, y);

        this.estaAbierta = false;
        this.tieneLlave = conLlave;
    }

    actualizar(){

        let disx = this.x - gameLayer.jugador.x;
        let disy = this.y - gameLayer.jugador.y;
        let h = Math.sqrt(Math.pow(disx,2) + Math.pow(disy,2));

        if(Math.abs(h) < 16 ){
            if(!this.tieneLlave){
                this.estaAbierta = true;
            } else {
                console.log("Necesitas una llave!");
            }
        }

        if(this.estaAbierta){
            if(this.imagen == cache[imagenes.puerta_cerrada]){
                this.imagen = cache[imagenes.puerta_abierta];
            } else  if(this.imagen == cache[imagenes.puerta_cerrada_v]){
                this.imagen = cache[imagenes.puerta_abierta_v];
            }


        }
    }
}