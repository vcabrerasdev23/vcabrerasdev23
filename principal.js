var juego = new Phaser.Game(370,550,Phaser.CANVAS,'bloque_juego');
var fondoJuego;
var boton;
var nave;
var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;
var velocidad = 3;
var escala = 0.3
var sonido_fondo

var estadoPrincipal = {
    preload: function() {
        // carga todos los recursos
        juego.load.image('fondo','img/bg2.jpg');
        juego.load.spritesheet('naves','img/nave2d.png',256,256);
        juego.load.audio('musica','soundspace.mp3');
    },

    create: function() {
        // mostrar pantalla
        fondoJuego = juego.add.tileSprite(0,0,370,550,'fondo');
        nave = juego.add.sprite(juego.width/2, juego.height/2,'naves');
        nave.anchor.setTo(0.5, 0.5);
        nave.frame = 1
        nave.animations.add('vuelo',[0,1,2,3,4,5,6,7],10,true);
        nave.scale.setTo(1*escala)
        nave.angle = 90
        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        sonido_fondo = juego.sound.add('musica');
        sonido_fondo.play();
    },

    update: function() {
        // animamos el juego
        fondoJuego.tilePosition.x-=1;
        nave.animations.play('vuelo');
        
        if (teclaDerecha.isDown) {
            nave.x += velocidad;
            nave.scale.setTo(1*escala,1*escala);
        }else if (teclaIzquierda.isDown) {
            nave.x-= velocidad;
            nave.scale.setTo(1*escala,-1*escala);
        }else if (teclaArriba.isDown) {
            nave.y-= velocidad;
        }else if (teclaAbajo.isDown) {
            nave.y+= velocidad;
        }
    }
};

//Asignamos el estdao que acaba de crear al juego
juego.state.add('principal',estadoPrincipal);
//Iniciar el juego del estado principal pro defecto
juego.state.start('principal');

