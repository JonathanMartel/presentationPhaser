var chargement = (function () {
	var _jeu;
	var chargement = function (jeu) {
		_jeu = jeu;
	}

	chargement.prototype = {
		preload: function () {
			_jeu.load.tilemap('carte', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
			_jeu.load.image('tuiles', 'assets/tileset01_64.png');
			_jeu.load.image('bouton', 'assets/bouton.png');
			_jeu.load.image('fleur', 'assets/fleur.png');
			_jeu.load.image('bandeau', 'assets/heros.png');
			
			_jeu.load.atlasJSONHash('chevre', 'assets/mc_chevre_2anim.png', 'assets/mc_chevre_2anim.json');
			_jeu.load.atlasJSONHash('loup', 'assets/mc_loup.png', 'assets/mc_loup.json');
			
			_jeu.ecran_demarrage = _jeu.add.sprite(0, 0, "ecran_demarrage");
			_jeu.barreChargement = this.add.sprite(360  , 240, "barre_chargement");
			_jeu.barreChargement.anchor.setTo(0.5, 0.5  );
			this.load.setPreloadSprite(_jeu.barreChargement);
			//console.log(_jeu);
		},
		create: function () {
			_jeu.state.start("Menu", false);
		}
	}

	return chargement;
})();