class Sala {

    constructor(origen_x,origen_y){

        //Posicionon absoluta de la sala respecto al nivel
        this.x = 64 + (salasx * origen_x + origen_x + 1) *16;
        this.y = 64 + (salasy * origen_y + origen_y + 1) *16;

        //Puestas
        this.norte = false;
        this.sur = false;
        this.este = false;
        this.oeste = false;

        //Posible posicion de spawn del jugador
        this.playerx = 0;
        this.playery = 0;

        //Inicializacion de la matriz de contenido de la sall
        this.matrizSala = [];
        for(var i = 0; i < salasy; i++){
            this.matrizSala[i] = [];
            for(var j = 0; j < salasx; j++){
                this.matrizSala[i][j] = null;
            }
        }

    }

    actualizarSala(){
        for(var i = 0; i < salasy; i++){
            for(var j = 0; j < salasx; j++){
                if(this.matrizSala[i][j] != null) {
                    this.matrizSala[i][j].x += this.x;
                    this.matrizSala[i][j].y += this.y;
                }
            }
        }
    }

    //El metodo dibujar dibuja todos los objetos contenidos en la sala
    dibujar(){

        for(var i = 0; i < salasy; i++){
            for(var j = 0; j < salasx; j++){
                //Al metodo dibujar de cada objeto se le pasan las coordenadas de la sala
                //para poder sumarlas a su "x" e "y" relativas al origen de la sala.
                if(this.matrizSala[i][j] != null) this.matrizSala[i][j].dibujar(this.x,this.y);
            }
        }
    }

}