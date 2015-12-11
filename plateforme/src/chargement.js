/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
var chargement = (function () {
	var _jeu;
	var chargement = function (jeu) {
		_jeu = jeu;
	}

	chargement.prototype = {
		preload: function () {
            _jeu.load.json('jsMaitre', "assets/maitre.json");
            _jeu.load.image('bouton', 'assets/bouton.png');
		},
		create: function () {
            _jeu.jsMaitre = _jeu.cache.getJSON('jsMaitre');
            //console.log(_jeu.infoNiveau);
            _jeu.state.start("ChangeNiveau", true, false, 0);
		}
	}

	return chargement;
})();