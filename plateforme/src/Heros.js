/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */
var Heros = (function () {
    //var velocite = 400;
    
    var Heros = function (jeu, x, y) {  
        Phaser.Sprite.call(this, jeu, x, y, "chevre");
        _jeu = jeu;
        this.pv = 5;
        this.animations.add('idle', Phaser.Animation.generateFrameNames('chevre_idle', 0, 79, '', 4), 30, true);
        this.animations.add('marche', Phaser.Animation.generateFrameNames('chevre_marche', 0, 29, '', 4), 30, true);

        this.scale = new Phaser.Point(.1, .1);

        this.anchor.setTo(0.5,0.5);

        this.vitesse = 200;

        _jeu.physics.enable(this);
        this.body.checkCollision.up = false;
        this.body.collideWorldBounds = true;
        
        this.pgProjectile = _jeu.add.physicsGroup();
            
        for(var i=0; i<5 ; i++)
        {
            var balle = new Projectile(_jeu, this.x, this.y);
            //_jeu.add.existing(balle);
            this.pgProjectile.add(balle);
            balle.kill();
        }
        
	}
	Heros.prototype = Object.create(Phaser.Sprite.prototype);
	Heros.prototype.constructor = Heros;
	    
    Heros.prototype.update = function(){
      
    };
    Heros.prototype.lancerFeu = function(pointeur){
        //var balle = new Projectile(_jeu, _jeu.heros.x, _jeu.heros.y);
        //_jeu.add.existing(balle);
        var balle = this.pgProjectile.getFirstDead();
        if(balle)
        {
            var direction = "droite";
            if(_jeu.input.mousePointer.worldX < this.x)
            {
                direction = "gauche";
            }
            balle.lancer(this.x, this.y, direction);
            console.log(this.x, this.y);
        }

        //console.log(balle);
        console.log(this.pgProjectile.length);

    },
    Heros.prototype.toucher = function(ennemi){
        ennemi.destroy();
        
        //this.pv--;
        this.alpha -= .2;
        if(this.alpha <=0)
        {
            _jeu.state.restart();
            
        }
        console.log(this);
    };
    Heros.prototype.direction = function(dir)
    {
       
    };
    
    return Heros;

})();