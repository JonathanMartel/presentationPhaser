/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
(function () {  // IIFE
"use strict";
        var jeu = new Phaser.Game(768, 640, Phaser.AUTO, 'jeu');
        //var jeu = new Phaser.Game(400, 400, Phaser.AUTO, 'jeu');
        jeu.state.add("Jouer",jouer);
        jeu.state.add("Gagnant",gagnant);
        jeu.state.add("Chargement",chargement);
        jeu.state.add("ChangeNiveau",changeniveau);
    
        jeu.state.start("Chargement");
		
})();