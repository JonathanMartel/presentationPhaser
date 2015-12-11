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