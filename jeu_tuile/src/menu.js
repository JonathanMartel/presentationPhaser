/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */

var menu = (function () {
	var _jeu;
	var menu = function (jeu) {
		_jeu = jeu;
	}

	menu.prototype = {
		create: function () {
			var btnJouer = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY, "bouton", this.jouer, this);
			btnJouer.anchor.setTo(0.5, 0.5);
			console.log('Menu');
			//  _jeu.barreChargement.destroy();
		},
		jouer: function () {
			_jeu.state.start("Jouer");
		}
	}

	return menu;


})();