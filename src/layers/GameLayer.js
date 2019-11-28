class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();

        this.espacio = new Espacio(1);
        this.scrollX = 0;
        this.fondoPuntos = new Fondo(imagenes.icono_puntos,480*0.85,320*0.05);

        this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);
        this.puntos = new Texto("0",480*0.9,320*0.08)
        this.enemigos = [];


        this.disparosJugador = []
        this.bloques = []

        this.cargarMapa("res/0.txt");
    }

    calcularScroll(){
        if(this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }
        if(this.jugador.x < this.anchoMapa - 480 * 0.3) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

    }

    actualizar (){
        if(this.jugador.y > 480){
            this.iniciar();
        }

        this.espacio.actualizar();


        this.fondo.vx = -1;
        this.fondo.actualizar();
        for(var i = 0; i < this.disparosJugador.length; i++){
            if(this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()) {
                this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i,1);

                i--;
            }
        }


        this.jugador.actualizar();

        for (var i=0; i < this.disparosJugador.length; i++) {
            if(this.disparosJugador[i] != null &&
            this.disparosJugador[i].vx == 0){
                this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i,1);
                i--;
            }
        }

        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }


        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.iniciar();
            }
        }

        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.disparosJugador.splice(i, 1);
                    i = i-1;
                    this.enemigos[j].impactado();
                    j = j-1;
                    this.puntos.valor++;
                }
            }
        }

        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {

                this.enemigos.splice(j, 1);
            }
        }


    }

    dibujar (){
        this.calcularScroll();
        this.fondo.dibujar();
        for(var i = 0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX);
        }
        this.jugador.dibujar(this.scrollX);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX);
        }

        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

    }

    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);
            }
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.saltar();
        }

    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET",ruta,false);

        fichero.onreadystatechange = function(){
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = lineas[0].length *40;
            for(var i=0;i<lineas.length;i++){
                var linea = lineas[i];
                for(var j=0;j<linea.length;j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40;
                    var y = 32 + i * 32;
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send();
    }

    cargarObjetoMapa(simbolo,x,y){
        switch(simbolo){
            case "1":
                this.jugador = new Jugador(x,y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra,x,y);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "E":
                var enemigo = new Enemigo(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;

        }
    }

}
