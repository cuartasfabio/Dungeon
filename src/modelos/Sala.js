class Sala {

    constructor(origen_x,origen_y){

        this.x = 64 + (salasx * origen_x + origen_x + 1) *16;
        this.y = 64 + (salasy * origen_y + origen_y + 1) *16;

        this.matrizSala = [];
        for(var i = 0; i < salasy; i++){
            this.matrizSala[i] = [];
            for(var j = 0; j < salasx; j++){
                this.matrizSala[i][j] = null;
            }
        }

    }

    /*colocarInterior(){
        for(var i = 0; i < salasy; i++){
            for(var j = 0; j < salasx; j++){
                this.matrizSala[i][j].x += this.x;
                this.matrizSala[i][j].y += this.y;
            }
        }
    }*/

    dibujar(){

        for(var i = 0; i < salasy; i++){
            for(var j = 0; j < salasx; j++){
                this.matrizSala[i][j].dibujar(this.x,this.y);
            }
        }
    }

}