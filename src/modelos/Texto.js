class Texto {
    constructor(){

    }

    dibujar(valor,x,y){
        contexto.font = "31px Arial";
        contexto.fillStyle = "black";
        contexto.textAlign = "Left";
        contexto.fillText(valor,x-1.5,y+1.5);
        contexto.font = "30px Arial";
        contexto.fillStyle = "white";
        contexto.fillText(valor,x,y);
    }
}