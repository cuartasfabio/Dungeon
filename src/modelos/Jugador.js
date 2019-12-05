class Inventario {
    constructor(){
        //Lista de los objetos guardados en el inventario
        this.listaObjetos = [];
        //Guarda pares de valores (tipo del objeto, cantidad del objeto)
        this.cantidadObjetos = new Map();
        //Guarda el indice de la listaObjetos del objeto seleccionado actualmente
        this.objetoActual = 0;

        //Inicialmente meto una bomba, llave y espada
        this.meterObjeto(new BombaItem(0,0));
        this.meterObjeto(new Llave(0,0));
    }

    //Mete el objeto pasado al inventario
    meterObjeto(obj){
        var tipoObjeto = obj.constructor.name;
        //Si el tipo del objeto a meter ya está en la lista
        if(this.estaEnElInventario(obj)){
            //Incrementa su cantidad en el Map
            this.cantidadObjetos.set(tipoObjeto, this.cantidadObjetos.get(tipoObjeto)+1)
        //Si el objeto no estaba en el inventario
        } else {
            //Lo mete en la lista
            this.listaObjetos.push(obj);
            //Lo mete en el Map con cantidad 1
            this.cantidadObjetos.set(tipoObjeto,5);
        }
    }

    //Comprueba que en el array del inventario ya hay objetos del mismo tipo
    estaEnElInventario(obj){
        for(let i = 0; i < this.listaObjetos.length; i++){
            if(this.listaObjetos[i].constructor.name == obj.constructor.name){
                return true;
            }
        }
        return false;
    }

    //Saca del inventario el objeto seleccionado actualmente
    usarObjetoSeleccionado(){
        var tipoObjeto = this.listaObjetos[this.objetoActual].constructor.name;
        //Si el objeto tiene cantidad mayor o igual
        if(this.cantidadObjetos.get(tipoObjeto) >= 1){
            //El objeto hace lo que tenga que hacer
            var bool = this.listaObjetos[this.objetoActual].usarItem();
            //Decrementa su cantidad en el Map SI SE PUEDO USAR EL OBJETO
            if(bool) this.cantidadObjetos.set(tipoObjeto, this.cantidadObjetos.get(tipoObjeto)-1);
        } else {
            console.log("Objeto no encontrado en el inventario!");
        }
    }


}

class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        //INVENTARIO DEL JUGADOR
        this.inventario = new Inventario();

        // Cadencia bomba
        this.cadenciaUsoObjeto = 30;
        this.tiempoParaUsarObjeto = 0;

    }

    actualizar(){
        // Tiempo Disparo
        if ( this.tiempoParaUsarObjeto > 0 ) {
            this.tiempoParaUsarObjeto--;
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    usarObjeto(){
        if (this.tiempoParaUsarObjeto < 1) {
            // reiniciar Cadencia
            this.tiempoParaUsarObjeto = this.cadenciaUsoObjeto;
            this.inventario.usarObjetoSeleccionado();
        }
    }


    moverX (direccion){
        this.vx = direccion * 1;
    }

    moverY (direccion){
        this.vy = direccion * 1;
    }

}
