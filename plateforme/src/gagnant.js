/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
var gagnant = (function () {

    var gagnant = function(jeu){_jeu = jeu;}
        
    gagnant.prototype = {
        init: function(){
            console.log("Gagnant")
        },
        create: function(){
            var btnJouer = this.game.add.button(150,150,"bouton",this.redemarrer,this);
            btnJouer.anchor.setTo(0.5,0.5);
        },
        redemarrer:function()
        {
            _jeu.state.start("ChangeNiveau", true, false, 0);
        }

    }
    return gagnant;
})();