/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
/* Source : 
http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
*/

(function () {  // IIFE
"use strict";
        var jeu = new Phaser.Game(768, 640, Phaser.AUTO, 'jeu');
        jeu.state.add("Demarrage",demarrage);
        jeu.state.add("Chargement",chargement);
        jeu.state.add("Menu",menu);
        jeu.state.add("Jouer",jouer);
        jeu.state.add("Perdant",perdant);
        jeu.state.add("Gagnant",gagnant);
        jeu.state.start("Demarrage");
		jeu.TAILLETUILE=64;
})();