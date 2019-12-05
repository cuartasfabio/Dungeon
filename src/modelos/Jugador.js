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
        this.meterObjeto(new Espada(0,0));

        //Texto para representar la cantidad del objeto seleccionado
        this.cantidad = new Texto();
    }

    //Cambia el item seleccionado del inventario, hacia la izquierda o derecha del array
    cambiarSeleccion(dir){
      if(dir > 0){
          //se mueve a la derecha
         if(this.objetoActual < this.listaObjetos.length - 1){
             this.objetoActual++;
         } else {
             this.objetoActual = 0;
         }
      } else {  //se mueve a la izquierda
          if(this.objetoActual > 0){
              this.objetoActual--;
          } else {
              this.objetoActual = this.listaObjetos.length - 1;
          }
      }
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
            this.cantidadObjetos.set(tipoObjeto,1);
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

    dibujar(x,y){
        var caja = cache[imagenes.marco_gui];
        contexto.drawImage(caja,
            x - caja.width /2,
            y - caja.height /2);
        //Dibuja el item seleccionado   (usa otro sprite mas grande tambien asociado al modelo)
        var item = cache[this.listaObjetos[this.objetoActual].ruta_gui];
        contexto.drawImage(item,
            x - item.width /2,
            y - item.height /2);

        //Dibuja el item siguiente (pero con algo menos de alfa y mas pequeño)
        if(this.objetoActual < this.listaObjetos.length - 1){
            var itemSiguiente = cache[this.listaObjetos[this.objetoActual+1].ruta_gui_alfa];
        } else {
            var itemSiguiente = cache[this.listaObjetos[0].ruta_gui_alfa];
        }
        contexto.drawImage(itemSiguiente,
            x - itemSiguiente.width /2 + 74,
            y - itemSiguiente.height /2 + 7,
            itemSiguiente.width*0.7,
            itemSiguiente.height*0.7);

        //Dibuja el item anterior (pero con algo menos de alfa y mas pequeño)
        if(this.objetoActual > 0){
            var itemAnterior = cache[this.listaObjetos[this.objetoActual-1].ruta_gui_alfa];
        } else {
            var itemAnterior = cache[this.listaObjetos[this.listaObjetos.length-1].ruta_gui_alfa];
        }
        contexto.drawImage(itemAnterior,
            x - itemAnterior.width /2 - 55,
            y - itemAnterior.height /2 + 7,
            itemAnterior.width*0.7,
            itemAnterior.height*0.7);

        //Dibuja la cantidad del item
        this.cantidad.dibujar(this.cantidadObjetos.get(this.listaObjetos[this.objetoActual].constructor.name),
            x + (caja.width/2)*0.3,y + (caja.height/2)*0.6);
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
