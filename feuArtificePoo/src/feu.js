/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
var Feu = (function () {
    var Feu = function (jeu, x, y, frame) {  
        Phaser.Sprite.call(this, jeu, x, y, '');
		
        _jeu = jeu;
        
        console.log("create");
        console.log(this);
    

        this.emitter = _jeu.add.emitter(_jeu.world.centerX, _jeu.world.height, 1000);
        this.emetteurs = [];
        for(var i=0; i<_jeu.NB_RAYON ;i++)
        {
            var e = _jeu.add.emitter(300, 300, 50);
            e.makeParticles('eclat', [1,2,3,4,5,6,7,8,9,10]);
            e.maxParticleScale = 0.6;
            e.minParticleScale = 0.2;
            this.emetteurs.push({emetteur:e, tween : _jeu.add.tween(e)});

        }


        this.emitter.makeParticles('eclat', [1,2,3,4,5,6,7,8,9,10]);
        this.emitter.maxParticleScale = 0.6;
        this.emitter.minParticleScale = 0.2;
        
        this.emitter.gravity = 500;
        
        
	}
	Feu.prototype = Object.create(Phaser.Sprite.prototype);
	Feu.prototype.constructor = Feu;
	
	 
     
    Feu.prototype.feu = function(pointeur){
        console.log(this.emitter);
        this.emitter.x = _jeu.world.centerX;
        this.emitter.y = _jeu.world.height;
            
        var feu = _jeu.add.tween(this.emitter).to( {x: pointeur.x, y:pointeur.y}, 2000, Phaser.Easing.Quadratic.In, true, 0, 0, false);
        feu.onComplete.add(this.explosion, this);
        this.emitter.start(false, 500, 1,0);
            
        console.log('feu');
          
            
    };
    Feu.prototype.explosion = function(){
        this.emitter.on = false;
        this.emitter.destroy();
        
        var angle = (360/_jeu.NB_RAYON )*Math.PI/180;
        var h = 150;
        for(var i=0; i< _jeu.NB_RAYON  ; i++)
        {
            this.emetteurs[i].emetteur.x = this.emitter.x;
            this.emetteurs[i].emetteur.y = this.emitter.y;
            var deltatY = Math.sin(angle*i)*h;
            var deltatX = Math.cos(angle*i)*h;
            var x = this.emitter.x + deltatX;
            var y = this.emitter.y + deltatY;
            
            this.emetteurs[i].tween.timeline = [];
            this.emetteurs[i].tween.to( {x: x , y:y}, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
            this.emetteurs[i].emetteur._quantity = 0;
            this.emetteurs[i].tween.onComplete.add(this.fin, this);
            this.emetteurs[i].emetteur.start(false, 100, 1,20);
            
        }
        
        console.dir(this.emetteurs[0].emetteur);
        

    };
    Feu.prototype.fin = function(emetteur){
        console.log('detruire');
        nbVivant=0
        emetteur.destroy();
        
        for(var i=0; i<this.emetteurs.length ; i++)
        {
            if(this.emetteurs[i].emetteur!=null)
            {
                nbVivant++;
            }
        }
        if(nbVivant!=0)
        {
            this.destroy();
            
        }
    };

    Feu.prototype.enleveTween = function(e){
        _jeu.tweens.removeFrom(this.emetteurs);
    };
        
    return Feu;

})();