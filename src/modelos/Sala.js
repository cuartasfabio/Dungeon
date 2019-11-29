class Sala {

    constructor(origen_x,origen_y){
        this.matrizSala = [];
        for(var i = 0; i < salasy; i++){
            this.matrizSala[i] = [];
        }

        this.x = ancho * origen_x + origen_x + 1;
        this.y = alto * origen_y + origen_y + 1;

    }

}