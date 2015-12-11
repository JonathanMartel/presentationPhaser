/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
var demarrage = (function(){
	var _jeu;
    var demarrage = function(jeu){
        console.log("%cDémarrage de mon jeu", "color:white; background:red");
        _jeu = jeu;
    };

    demarrage.prototype = {
        preload: function(){
            _jeu.load.image('ecran_demarrage', 'assets/demarrage.jpg');
            _jeu.load.image('barre_chargement', 'assets/chargement.png');

        },
        create: function(){
            _jeu.state.start("Chargement", false);
        }
    }	
    return demarrage;	
	
})();

