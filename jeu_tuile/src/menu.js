var menu = (function () {
	var _jeu;
	var menu = function (jeu) {
		_jeu = jeu;
	}

	menu.prototype = {
		create: function () {
			//var gameTitle = this.game.add.sprite(160,160,"gametitle");
			//gameTitle.anchor.setTo(0.5,0.5);
			var playButton = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY, "bouton", this.jouer, this);
			playButton.anchor.setTo(0.5, 0.5);
			console.log('Menu');
			//  _jeu.barreChargement.destroy();
		},
		jouer: function () {
			_jeu.state.start("Jouer");
		}
	}

	return menu;


})();