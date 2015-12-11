var perdant = function(game){}

perdant.prototype = {
	create: function(){
  		
		var playButton = _jeu.add.button(this.game.world.centerX, this.game.world.centerY, "bouton", this.playTheGame, this);
		playButton.anchor.setTo(0.5, 0.5);
	},
	playTheGame: function(){
		this.game.state.start("Jouer");
	}
}