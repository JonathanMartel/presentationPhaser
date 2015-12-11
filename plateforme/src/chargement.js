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