var Projectile = (function () {
    //var velocite = 400;
    
    var Projectile = function (jeu, x, y) {  
        Phaser.Sprite.call(this, jeu, x, y, "balle");
        _jeu = jeu;
        this.velocite = {
                            droite : 400,
                            gauche:-400
                        };
        
        this.anchor.setTo(0,0.5);
        _jeu.physics.enable(this);
        this.body.allowGravity = false;
        this.body.velocity.x = this.velocite;
        this.outOfBoundsKill = true;
        //console.log("create");
        
        
        
	}
	Projectile.prototype = Object.create(Phaser.Sprite.prototype);
	Projectile.prototype.constructor = Projectile;
	    
    Projectile.prototype.update = function(){
        _jeu.physics.arcade.collide(this, _jeu.pgLoup, this.toucherCible);
        if(this.x < 0 || this.x > _jeu.world.width)
        {
            this.kill();
            //console.log('tuer');
            this.x = 0;
            this.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        
    };
    Projectile.prototype.toucherCible = function (proj, cible)
    {
        cible.toucher();
        proj.kill();
    };
    Projectile.prototype.lancer = function(posX,posY,dir)
    {
        
        //this.x = posX;
        //this.y = posY;
        
        this.reset(posX, posY);
        //this.body.velocity.x = this.velocite;
        this.direction(dir);
        //console.log(this.x, this.y);
    }
    Projectile.prototype.direction = function(dir)
    {
        this.body.velocity.x = this.velocite[dir];
        
        if(dir == "gauche")
        {
            this.rotation = Math.PI;
        }
        else if(dir == "droite")
        {
           this.rotation = 0;
        }
        
    }
    
    return Projectile;

})();