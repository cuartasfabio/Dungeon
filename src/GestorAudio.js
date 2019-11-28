const musicaAmbiente = new Audio("res/musica_ambiente.mp3");
musicaAmbiente.loop = true;

const efectos = {
    disparo: "res/efecto_disparo.mp3",
    explosion: "res/efecto_explosion.mp3"
}

function reproducirMusica(){
    musicaAmbiente.play();
}
function paraMusica(){

    musicaAmbiente.stop();
}
function reproducirEfect(srcEfect){
    const efecto = new Audio(srcEfect);
    efecto.play();
}