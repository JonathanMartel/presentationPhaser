/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
var perdant = (function(){
	var _jeu;
	var perdant = function(jeu){
		_jeu = jeu;
	}
	
	perdant.prototype = {
		create: function(){
	  		
			var btnJouer = _jeu.add.button(this.game.world.centerX, this.game.world.centerY, "bouton", this.jouer, this);
			btnJouer.anchor.setTo(0.5, 0.5);
		},
		jouer: function(){
			this.game.state.start("Jouer");
		}
	}
    return perdant;
})();