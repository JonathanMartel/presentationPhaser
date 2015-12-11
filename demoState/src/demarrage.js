var demarrage = (function(){
    "use strict";
	var _jeu;
    var demarrage = function(jeu){
	   console.log("%cDémarrage de mon jeu", "color:white; background:red");
	   _jeu = jeu;
    };
  
    demarrage.prototype = {
        preload: function(){
            

        },
        create: function(){
            
        }
    }	
    return demarrage;	
	
})();

