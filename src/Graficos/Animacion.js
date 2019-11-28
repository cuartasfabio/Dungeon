class Animacion {
    constructor(imagenSrc, modeloAncho, modeloAlto, velocidadRefresco, framesTotales, callback){
        this.imagen = new Image();
        this.imagen.src = imagenSrc;

        this.callback = callback;

        this.modeloAncho = modeloAncho;
        this.modeloAlto = modeloAlto;
        this.velocidadRefresco = velocidadRefresco;
        this.framesTotales = framesTotales;

        this.framesActual = 0;
        this.frameAncho = this.imagen.width / this.framesTotales;
        this.frameAlto = this.imagen.height;

        this.rectanguloDibujo = {
            x:0,
            y:0,
            ancho: this.frameAncho,
            alto: this.frameAlto,
        };

        this.ultimaActualizacion = 0;
    }

    actualizar(){
        this.ultimaActualizacion++;

        if(this.ultimaActualizacion > this.velocidadRefresco) {
            this.ultimaActualizacion = 0;
            this.framesActual++;


            if(this.framesActual >= this.framesTotales) {
                this.framesActual = 0;
                if ( this.callback != null){
                    // avisar de que acabo
                    this.frameActual = 0;
                    this.callback();
                } else {
                    // reiniciar, es infinita
                    this.frameActual = 0;
                }

            }
        }

        this.rectanguloDibujo.x = this.framesActual * this.frameAncho;
    }

    dibujar(x,y){
        contexto.drawImage(
            this.imagen,
            this.rectanguloDibujo.x,
            this.rectanguloDibujo.y,
            this.rectanguloDibujo.ancho,
            this.rectanguloDibujo.alto,
             x - this.modeloAncho /2,
             y - this.modeloAlto /2,
            this.modeloAncho,
            this.modeloAlto
        );
    }
}