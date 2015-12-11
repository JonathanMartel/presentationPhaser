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

