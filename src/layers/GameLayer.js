class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        //this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,640*0.5,480*0.5);


        //Rutas de las salas a cargar
        this.txtSalas = ["res/sala0.txt","res/sala1.txt","res/sala2.txt"];
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

        this.tilesParedYSuelo = [];
        //this.tilesPared = [];

        //this.enemigos = [];
        //this.enemigos.push(new Enemigo(300,50));
        //this.enemigos.push(new Enemigo(350,200));

        //this.disparosJugador = [];

        this.cargarMapa();
        this.asignarSalas();
    }

    actualizar (){
        // this.jugador.actualizar();
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
        // this.jugador.dibujar();
        // for (var i=0; i < this.enemigos.length; i++){
        //     this.enemigos[i].dibujar();
        // }

        for (var i=0; i < this.tilesParedYSuelo.length; i++){
            this.tilesParedYSuelo[i].dibujar();
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
        // // Eje X
        // if ( controles.moverX > 0 ){
        //     this.jugador.moverX(1);
        //
        // }else if ( controles.moverX < 0){
        //     this.jugador.moverX(-1);
        //
        // } else {
        //     this.jugador.moverX(0);
        // }
        //
        // // Eje Y
        // if ( controles.moverY > 0 ){
        //     this.jugador.moverY(-1);
        //
        // } else if ( controles.moverY < 0 ){
        //     this.jugador.moverY(1);
        //
        // } else {
        //     this.jugador.moverY(0);
        // }

    }

    cargarMapa(){
        var lx = salasx * ancho + ancho +1;
        var ly = salasy * alto + alto +1;
        for(var i = 0; i < ly; i++){
            for(var j = 0; j < lx; j++){
                if(i==0 || j==0 || i== ly || j== lx || (i%(salasy+1))==0 || (j%(salasx+1))==0){
                    var pared = new Fondo(imagenes.pared,16 + 16*j,16 + 16*i);
                    this.tilesParedYSuelo.push(pared);
                } else {
                    var suelo = new Fondo(imagenes.suelo,16 + 16*j,16 + 16*i);
                    this.tilesParedYSuelo.push(suelo);
                }
            }
        }
    }

    asignarSalas(){
        //rellena la matriz de salas que representa el suelo del nivel con un patron de sala aleatorio
        for(var i = 0; i < this.salas.length; i++){
            for(var j = 0; j < this.salas[0].length; j++){
                //coje una ruta aleatoria para crear la sala
                var indiceRandom = Math.floor(Math.random() * (this.txtSalas.length-1));
                //crea la sala y la asocia a la matriz con el indice de ruta y su posicion
                this.salas[i][j] = crearSala(indiceRandom,i,j);
            }
        }

    }

    crearSala(indiceRuta,i,j){
        var sala;
        //Si nunca se ha creado antes la sala, la crea usando el fichero
        if(this.listaSalas[indiceRuta] == null) {
            var ruta = this.txtSalas[indiceRuta];

            var fichero = new XMLHttpRequest();
            fichero.open("GET", ruta, false);
            fichero.onreadystatechange = function () {
                var texto = fichero.responseText;
                var lineas = texto.split('\n');
                //var xSala = lineas[0].length *16 *iniciox;
                //var ySala = lineas.length *16 *inicioy;
                sala = new Sala();
                for (var i = 0; i < lineas.length; i++) {
                    var linea = lineas[i];
                    for (var j = 0; j < linea.length; j++) {
                        var simbolo = linea[j];
                        this.cargarObjetoSala(sala, simbolo, i, j);
                    }
                }
                this.listaSalas.push(sala);
            }.bind(this);
            fichero.send();

        } else {    //Si ya ha sido creada , hace una copia del contenido de la ya creada a esta
            //creo una nueva sala con en sus correspondientes coordenadas
            sala = new Sala(i,j);
            //su matrizSala será la misma que la sala ya creada con este fichero

        }


        //Marca la ruta como usada
        this.listaSalas[indiceRuta] = true;

    }

    cargarObjetoSala(sala,simbolo,i,j){
        switch(simbolo){
            case "1":
                var pared = new pared(imagenes.pared,j * 16,i * 16);
                this.tilesSuelo.push(suelo);
                break;
        }
    }

}
