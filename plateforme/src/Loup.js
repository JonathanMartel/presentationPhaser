var Loup = (function () {
    //var velocite = 400;
    
    var Loup = function (jeu, x, y) {  
        Phaser.Sprite.call(this, jeu, x, y, "loup");
        _jeu = jeu;

        this.animations.add('marche', Phaser.Animation.generateFrameNames('loup_marche', 0, 29, '', 4), 30, true);

        this.scale = new Phaser.Point(.1, .1);

        this.anchor.setTo(0.5,0.5);

        this.vitesse = 200;

        _jeu.physics.enable(this);
        this.body.checkCollision.up = false;
        this.body.collideWorldBounds = true;
        this.body.immovable = true;
        
        this.pgProjectile = _jeu.add.physicsGroup();    
        for(var i=0; i<5 ; i++)
        {
            var balle = new Projectile(_jeu, this.x, this.y);
            //_jeu.add.existing(balle);
            this.pgProjectile.add(balle);
            balle.kill();
        }
        
	}
	Loup.prototype = Object.create(Phaser.Sprite.prototype);
	Loup.prototype.constructor = Loup;
	    
    Loup.prototype.update = function(){
        if(Math.random()*1000 > 950)
        {
            this.lancerFeu();
        }
    };
    Loup.prototype.toucher =function()
    {
        this.destroy();  
    };
    Loup.prototype.lancerFeu = function(){
        
        var balle = this.pgProjectile.getFirstDead();
        if(balle)
        {
            var direction = "droite";
            if(_jeu.input.mousePointer.worldX < this.x)
            {
                direction = "gauche";
            }
            balle.lancer(this.x, this.y, direction);
            //console.log(this.x, this.y);
        }

        //console.log(balle);
        //console.log(_jeu.pgProjectile.length);

    };
    
    return Loup;

})();