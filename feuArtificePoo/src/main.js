/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */

var jouer = (function () {

    var jouer = function (jeu) {
        _jeu = jeu;
        _jeu.NB_RAYON = 25;
    };
    jouer.prototype = {
        preload : function(){
            _jeu.load.spritesheet('eclat', 'assets/firework-palette.png', 11, 11, 12);
            _jeu.stage.backgroundColor = '#000000';
        },
        create: function () { // À la creation du jeu 
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            Phaser.Physics.enableBody = true;
            _jeu.physics.arcade.gravity.y = 750;
            
            
            
            
            _jeu.input.onDown.add(this.lancerFeu, this);

        },
        lancerFeu : function(pointeur){
            var feu = new Feu(_jeu, _jeu.world.centerX, _jeu.world.height);
            _jeu.add.existing(feu);
            feu.feu(pointeur);
        }
    };
    return jouer;

})();