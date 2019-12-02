class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {

        //this.jugador en cargarJugador()

        this.espacio = new Espacio(0);

        this.fondo = new Fondo(imagenes.fondo,640*0.5,480*0.5);


        //Rutas de las salas a cargar
        this.txtSalas = ["res/sala0.txt","res/sala1.txt","res/sala2.txt","res/sala3.txt","res/sala4.txt"];
        //Lista de salas para saber si las salas se han creado ya o no.
        this.listaSalas = [];
        for(var i = 0; i < this.txtSalas.length; i++){
            this.listaSalas[i] = null;
        }

        //Matriz de salas asociadas al mapa
        this.salas = [];
        for(var i = 0; i < alto; i++){
            this.salas[i] = [];
        }

        this.paredes = [];
        this.tilesSuelos = [];
        this.puertas = [];

        //this.enemigos = [];
        //this.enemigos.push(new Enemigo(300,50));
        //this.enemigos.push(new Enemigo(350,200));

        //this.disparosJugador = [];

        this.cargarMapa();
        this.asignarSalas();
        this.cargarJugador();
    }

    actualizar (){

        this.espacio.actualizar();

        this.jugador.actualizar();
        // for (var i=0; i < this.enemigos.length; i++){
        //     this.enemigos[i].actualizar();
        // }
        // for (var i=0; i < this.disparosJugador.length; i++) {
        //     this.disparosJugador[i].actualizar();
        // }
        //
        //
        // // colisiones
        // for (var i=0; i < this.enemigos.length; i++){
        //     if ( this.jugador.colisiona(this.enemigos[i])){
        //         this.iniciar();
        //     }
        // }
        //
        // // colisiones , disparoJugador - Enemigo
        // for (var i=0; i < this.disparosJugador.length; i++){
        //     for (var j=0; j < this.enemigos.length; j++){
        //         if (this.disparosJugador[i] != null &&
        //             this.enemigos[j] != null &&
        //             this.disparosJugador[i].colisiona(this.enemigos[j])) {
        //
        //             this.disparosJugador.splice(i, 1);
        //             i = i-1;
        //             this.enemigos.splice(j, 1);
        //             j = j-1;
        //         }
        //     }
        // }

    }

    dibujar (){
        this.fondo.dibujar();

        // for (var i=0; i < this.disparosJugador.length; i++) {
        //     this.disparosJugador[i].dibujar();
        // }

        //Dibuja tiles del suelo
        for (var i=0; i < this.tilesSuelos.length; i++){
            this.tilesSuelos[i].dibujar();
        }

        this.jugador.dibujar();

        // for (var i=0; i < this.enemigos.length; i++){
        //     this.enemigos[i].dibujar();
        // }


        //Dibuja paredes
        for (var i=0; i < this.paredes.length; i++){
            this.paredes[i].dibujar();
        }
        //Dibuja puertas
        for (var i=0; i < this.puertas.length; i++){
            this.puertas[i].dibujar();
        }

        for(var i = 0; i < alto; i++){
            for(var j = 0; j < ancho; j++){
                this.salas[i][j].dibujar();
            }
        }
    }

    procesarControles( ){
        // disparar
        // if (  controles.disparo ){
        //     var nuevoDisparo = this.jugador.disparar();
        //     if ( nuevoDisparo != null ) {
        //         this.disparosJugador.push(nuevoDisparo);
        //     }
        // }
        //

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
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }

    //Carga los tiles del mapa, según las dimensiones de las salas y la cantidad de estas,
    //especificadas en el Main por: ancho, alto, salasx y salasy.
    cargarMapa(){
        //Anchura y altura TOTALES del nivel actual (suma de la anchura y altura respectivas de todas las salas
        // y los espacios entre ellas y bordes).
        var longitudTotalX = salasx * ancho + ancho +1;
        var longitudTotalY = salasy * alto + alto +1;
        for(var i = 0; i < longitudTotalY; i++){
            for(var j = 0; j < longitudTotalX; j++){
                //Si es la primera columna || la primera fila || la ultima fila
                if(i==0 || j==0 || i== longitudTotalY-1 || j== longitudTotalX-1
                    // || la separacion horiz. de 2 salas menos el sitio donde pueda ir una puerta
                    || ((i%(salasy+1))==0 && !this.puedeIrPuerta(j,longitudTotalX,salasx))
                    // || la separacion vert. de 2 salas menos el sitio donde pueda ir una puerta
                    || ((j%(salasx+1))==0 && !this.puedeIrPuerta(i,longitudTotalY,salasy))) {

                    //Ahí va una pared
                    var pared = new Pared(imagenes.pared, 64 + 16 * j, 64 + 16 * i);
                    this.espacio.agregarCuerpoEstatico(pared);
                    this.paredes.push(pared);

                } else if((i%(salasy+1))==0 && this.puedeIrPuerta(j,longitudTotalX,salasx) || ((j%(salasx+1))==0 && this.puedeIrPuerta(i,longitudTotalY,salasy))){
                    var suelo = new Fondo(imagenes.suelo,64 + 16*j,64 + 16*i);
                    this.tilesSuelos.push(suelo);

                    var puerta = new Puerta(imagenes.puerta_cerrada,64 + 16*j,64 + 16*i);
                    this.espacio.agregarCuerpoEstatico(puerta);
                    this.puertas.push(puerta);

                    if((j%(salasx+1))==0){
                        puerta.imagen = cache[imagenes.puerta_cerrada_v];
                    }

                } else { //Si no hay pared hay suelo
                    var suelo = new Fondo(imagenes.suelo,64 + 16*j,64 + 16*i);
                    this.tilesSuelos.push(suelo);
                }
            }
        }
    }


    puedeIrPuerta(coord,total,lado){
        for(var i = Math.floor(lado/2) +1; i < total; i+=(lado+1)){
            if(coord == i) { return true; }
        }
        return false;
    }

    asignarSalas(){
        //rellena la matriz de salas que representa el suelo del nivel con un patron de sala aleatorio
        for(var i = 0; i < this.salas.length; i++){
            for(var j = 0; j < ancho; j++){
                //coje una ruta aleatoria para crear la sala
                var indiceRandom = Math.floor(Math.random() * (this.txtSalas.length));
                //crea la sala y la asocia a la matriz con el indice de ruta y su posicion
                this.salas[i][j] = this.crearSala(indiceRandom,j,i);
            }
        }
    }

    crearSala(indiceRuta,x,y){
        var sala;
        //Si nunca se ha creado antes la sala, la crea usando el fichero
        // if(this.listaSalas[indiceRuta] == null) {
            var ruta = this.txtSalas[indiceRuta];

            //Lee el fichero de la sala
            var fichero = new XMLHttpRequest();
            fichero.open("GET", ruta, false);
            fichero.onreadystatechange = function () {
                var texto = fichero.responseText;
                var lineas = texto.split('\n');
                //var xSala = lineas[0].length *16 *iniciox;
                //var ySala = lineas.length *16 *inicioy;
                //Crea la sala en su posicion
                sala = new Sala(x,y);
                for (var i = 0; i < lineas.length; i++) {
                    var linea = lineas[i];
                    for (var j = 0; j < linea.length; j++) {
                        var simbolo = linea[j];
                        //Va añadiendo a la matriz de la sala los objetos que lee
                        //(en su posicion relativa en la sala).
                        this.cargarObjetoSala(sala, simbolo, i, j);
                    }
                }
                //Marco la sala como usada
                this.listaSalas[indiceRuta] = sala;
            }.bind(this);
            fichero.send();

        // } else {    //Si ya ha sido creada , hace una copia del contenido de la ya creada a esta
        //     //creo una nueva sala con en sus correspondientes coordenadas
        //     sala = new Sala(x,y);
        //     //Su matrizSala será la misma que la sala ya creada con este fichero.
        //     //Hago uso de la libreria lodash para poder clonar el array bidimensional
        //     //de la sala sin tener que implementar varias funciones extra para recorerlo,
        //     //copiar cada atributo de cada objeto que halla dentro...
        //     //Si no lo clono todas las salas iguales referenciarían a la misma matriz.
        //     sala.matrizSala = _.cloneDeep(this.listaSalas[indiceRuta].matrizSala);
        //     sala.playerx = this.listaSalas[indiceRuta].playerx;
        //     sala.playery = this.listaSalas[indiceRuta].playery;
        // }

        sala.actualizarSala();
        return sala;
    }

    cargarObjetoSala(sala,simbolo,i,j){
        switch(simbolo){
            case "1":
                var pared = new Pared(imagenes.pared,j * 16,i * 16);
                //7pared.y = pared.y - pared.alto/2;
                this.espacio.agregarCuerpoEstatico(pared);
                sala.matrizSala[i][j] = pared;
                this.paredes.push(pared);
                break;
            case "0":
                //var suelo = new Fondo(imagenes.suelo,j * 16,i * 16);
                //suelo.y = suelo.y - suelo.alto/2;
                //sala.matrizSala[i][j] = suelo;
                break;
            case "J":
                sala.playerx = j * 16;
                sala.playery = i * 16;
                break;
        }
    }

    cargarJugador(){
        //var salaRandom = this.salas[Math.random()*(this.salas.length-1)][Math.random()*(this.salas.length-1)];
        var salaRandom = this.salas[Math.floor(Math.random()*(alto))][Math.floor(Math.random()*(ancho))];
        this.jugador = new Jugador( salaRandom.x + salaRandom.playerx,salaRandom.y + salaRandom.playery);
        this.espacio.agregarCuerpoDinamico(this.jugador);
    }

}
