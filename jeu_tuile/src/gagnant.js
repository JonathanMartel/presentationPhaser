var gagnant = function(game){}

gagnant.prototype = {
	init: function(score){
		console.log("Perdant!")
	},
  	create: function(){
  		
		var playButton = this.game.add.button(150,150,"heros",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}