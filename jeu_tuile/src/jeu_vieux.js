/* Source : 
http://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/

https://phaser.io/examples/v2/sprites/move-a-sprite
*/
"use strict";

window.addEventListener("load", function () {
	var jeu = new Phaser.Game(768, 640, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update,
		render: render
	});

	function preload() { // Chargement du jeu 
		
		jeu.load.image('heros', 'assets/heros.png');
		
		jeu.load.tilemap('carte', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
		jeu.load.image('tuiles', 'assets/tileset01_64.png');

		jeu.load.atlasJSONHash('chevre', 'assets/mc_chevre_2anim.png', 'assets/mc_chevre_2anim.json');

	}

	function create() { // À la creation du jeu 
		jeu.physics.startSystem(Phaser.Physics.ARCADE);

		//this.heros = jeu.add.sprite(64, 64, 'heros');
		//  This sprite is using a texture atlas for all of its animation data
		this.heros = jeu.add.sprite(64, 64, 'chevre');
		this.heros.animations.add('idle', Phaser.Animation.generateFrameNames('chevre_idle', 0, 79, '', 4), 30, true);
		this.heros.animations.add('marche', Phaser.Animation.generateFrameNames('chevre_marche', 0, 29, '', 4), 30, true);
        
        this.heros.scale = new Phaser.Point(.21, .21);
		this.heros.vitesse = 200;

        this.mesEnnemis = jeu.add.physicsGroup(Phaser.Physics.Arcade);
        this.ennemi = [];
        this.ennemi.push(jeu.add.sprite(64 *3, 64*1, "chevre"));
        this.ennemi.push(jeu.add.sprite(64 *6, 64*1, "chevre"));
		
        
        for(var i=0; i<this.ennemi.length; i++)
        {
            this.mesEnnemis.add(this.ennemi[i]);
            this.ennemi[i].scale = new Phaser.Point(.21, .21);
            jeu.physics.enable(this.ennemi[i]);
            this.ennemi[i].body.velocity.x = 150;
        }
		
       

		jeu.physics.enable(this.heros);

		this.heros.body.collideWorldBounds = true;



		this.niveau = jeu.add.tilemap('carte');

		this.niveau.addTilesetImage('tuiles');
		this.couche = {
			"sol": this.niveau.createLayer('sol'),
			"mur": this.niveau.createLayer('mur')
		};

		this.couche.sol.resizeWorld();
		this.couche.mur.resizeWorld();
		this.niveau.setCollisionBetween(7, 8, true, this.couche.mur);
		this.couche.mur.debug = true;
		this.couche.sol.debug = true;


		this.curseur = jeu.input.keyboard.createCursorKeys();
	}

	function update() { // Sur chaque frame
		jeu.physics.arcade.collide(this.heros, this.couche.mur);
		jeu.physics.arcade.collide(this.heros, this.couche.sol);
        jeu.physics.arcade.collide(this.mesEnnemis, this.couche.mur);
        jeu.physics.arcade.collide(this.mesEnnemis, this.couche.sol);
        jeu.physics.arcade.collide(this.mesEnnemis);
        jeu.physics.arcade.collide(this.mesEnnemis, this.heros, toucher);
        for(var i=0; i<this.ennemi.length;i++)
        {
           
            if(this.ennemi[i].body.blocked.up || this.ennemi[i].body.blocked.right || this.ennemi[i].body.blocked.down || this.ennemi[i].body.blocked.left || (this.ennemi[i].body.velocity.x ==0 && this.ennemi[i].body.velocity.y ==0))
            {
                switch(Math.floor(Math.random()*4))
                {
                    case 0:
                        this.ennemi[i].body.velocity.x = 150;
                        break;
                    case 1:
                        this.ennemi[i].body.velocity.x = -150;
                        break;
                    case 2:
                        this.ennemi[i].body.velocity.y = 150;
                        break;
                    case 3:
                        this.ennemi[i].body.velocity.y = -150;
                        break;
                }
                
            }
            
            
        }
		this.heros.body.velocity.set(0);
		if (this.curseur.up.isDown) {
			this.heros.body.velocity.y -= this.heros.vitesse;
		}
		if (this.curseur.down.isDown) {
			this.heros.body.velocity.y += this.heros.vitesse;
		}
		if (this.curseur.left.isDown) {
			this.heros.body.velocity.x -= this.heros.vitesse;
		}
		if (this.curseur.right.isDown) {
			this.heros.body.velocity.x += this.heros.vitesse;
		}
		if (this.heros.body.velocity.x == 0 && this.heros.body.velocity.y == 0) {
			this.heros.animations.play('idle', 30, true);
			
		} else {
			//this.heros.animations.setFrame(this.heros.animations.currentFrame)
			this.heros.animations.play('marche', 30, true);
		}
        
        
    
        
	}

	function render() {
		jeu.debug.bodyInfo(this.ennemi[0], 32, 480);
	}
    
    function toucher()
    {
        console.log('ouch');
        jeu.state.restart();
    }
});