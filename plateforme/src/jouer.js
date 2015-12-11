var jouer = (function () {

    var jouer = function (jeu) {
        _jeu = jeu;
    };
    jouer.prototype = {
        init : function(niveau){
            this.niveauActuel = niveau || 0;
        },
        preload : function(){
            console.log("preload");
            
            _jeu.load.image('balle', 'assets/bullet.png');	// src : Phaser.io
            
            _jeu.load.tilemap(_jeu.infoNiveau.nom, 'assets/'+_jeu.infoNiveau.tilemap_json, null, Phaser.Tilemap.TILED_JSON);
            
            
			_jeu.load.image('tuiles', 'assets/tileset-platformer.png');
            _jeu.stage.backgroundColor = '#000000';
            _jeu.load.atlasJSONHash('chevre', 'assets/mc_chevre_2anim.png', 'assets/mc_chevre_2anim.json');
            _jeu.load.atlasJSONHash('loup', 'assets/mc_loup.png', 'assets/mc_loup.json');
        },
        create: function () { // À la creation du jeu 
           _jeu.niveauActif = 0;
            //*********************************/
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            Phaser.Physics.enableBody = true;
            _jeu.physics.arcade.gravity.y = 750;

            _jeu.zoneFin = new Phaser.Rectangle(0,0, 32, 32);
            
            _jeu.heros = new Heros(_jeu, 0, 0); //_jeu.add.sprite(0, 0, "chevre");
            console.log(_jeu.heros);
            
            
            _jeu.heros.x = 0;
            _jeu.heros.y = 0;

            this.chargementNiveau();
            
            
            console.log(_jeu.zoneFin);
            
            
            _jeu.camera.follow(_jeu.heros);
            _jeu.add.existing(_jeu.heros);
            
            
            _jeu.curseur = _jeu.input.keyboard.createCursorKeys();
            _jeu.wasd = {
                up: _jeu.input.keyboard.addKey(Phaser.Keyboard.W),
                down: _jeu.input.keyboard.addKey(Phaser.Keyboard.S),
                left: _jeu.input.keyboard.addKey(Phaser.Keyboard.A),
                right: _jeu.input.keyboard.addKey(Phaser.Keyboard.D),
            };
            _jeu.boutonSaut = _jeu.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            _jeu.input.onDown.add(_jeu.heros.lancerFeu, _jeu.heros);
            
            
            
            
           
        },
        
        update: function () { // Sur chaque frame
            _jeu.physics.arcade.collide(_jeu.heros, _jeu.couche.plateforme);
            _jeu.physics.arcade.collide(_jeu.pgLoup, _jeu.couche.plateforme);
            _jeu.physics.arcade.collide(_jeu.pgLoup, _jeu.couche.plateforme);
            _jeu.physics.arcade.collide(_jeu.heros, _jeu.pgLoup, this.toucherPerso);
            
            var x = _jeu.couche.plateforme.getTileX(_jeu.heros.x);
            var y = _jeu.couche.plateforme.getTileY(_jeu.heros.y);
            var tuile =  _jeu.niveau.getTile(x, y, _jeu.couche.plateforme);
			
            if(_jeu.heros.grimpe == true)
            {
                _jeu.heros.body.allowGravity = false; 
                if(tuile && tuile.properties.grimpe &&  tuile.properties.grimpe== 1)
                {
                    _jeu.heros.body.velocity.y = 0;
                }
                else
                {
                    _jeu.heros.grimpe = false;
                    _jeu.heros.body.allowGravity = true;
                }
            }
            else
            {
                _jeu.heros.body.allowGravity = true;
            }
           _jeu.heros.body.velocity.x = 0;
            if (_jeu.curseur.left.isDown || _jeu.wasd.left.isDown) {
                _jeu.heros.body.velocity.x = -_jeu.heros.vitesse;
            }
            if (_jeu.curseur.right.isDown || _jeu.wasd.right.isDown) {
                _jeu.heros.body.velocity.x = _jeu.heros.vitesse;
            }
            if (_jeu.curseur.up.isDown || _jeu.wasd.up.isDown) {
                
                if(tuile && tuile.properties.grimpe &&  tuile.properties.grimpe== 1)
                {
                    _jeu.heros.grimpe = true;
                    _jeu.heros.body.velocity.y = -_jeu.heros.vitesse;
                }
                //console.log(tuile);
            }
            
            if (_jeu.boutonSaut.isDown && (_jeu.heros.body.onFloor() || _jeu.heros.grimpe))
            {
                _jeu.heros.body.velocity.y = -550;
                _jeu.heros.grimpe = false;
            }
            
            if (_jeu.heros.body.velocity.x == 0 && _jeu.heros.body.velocity.y == 0) {
                _jeu.heros.animations.play('idle', 30, true);

            } else {
                _jeu.heros.animations.play('marche', 30, true);
            }
            
            if (Phaser.Rectangle.containsPoint(_jeu.zoneFin, _jeu.heros.body.position)) 
            {
                this.niveauActuel++;
                
                _jeu.state.start("ChangeNiveau", false, false, this.niveauActuel); 
            }

        },
        toucherPerso : function(heros, loup){

            heros.toucher(loup);
        },
        chargementNiveau : function(index)
        {
            
            if(_jeu.niveau)
            {
                _jeu.niveau.destroy();
                _jeu.couche.plateforme.destroy();
            }
            var niveau = _jeu.infoNiveau;
            _jeu.niveau = _jeu.add.tilemap(niveau.nom);
            _jeu.niveau.addTilesetImage('tuiles');
            //
            _jeu.couche = {
                "plateforme": _jeu.niveau.createLayer(niveau.couche)
            };

            _jeu.couche.plateforme.resizeWorld();

            _jeu.niveau.setCollision(niveau.collision, true, _jeu.couche.plateforme);

            _jeu.couche.plateforme.debug = true;

            // Condition de fin de niveau
            _jeu.zoneFin.x = niveau.fin.tileX*32;
            _jeu.zoneFin.y = niveau.fin.tileY*32;

            // Gestion du héros
            _jeu.heros.x = niveau.heros.x;
            _jeu.heros.y = niveau.heros.y;
            _jeu.world.bringToTop(_jeu.heros);


            _jeu.pgLoup = _jeu.add.physicsGroup();
            for(var i=0; i<niveau.ennemis.length;i++)
            {
                _jeu.pgLoup.add(new Loup(_jeu, niveau.ennemis[i].x, niveau.ennemis[i].y));
            }
           
            
            
        },
        render : function () {
            _jeu.debug.geom(_jeu.zoneFin,'#0fffff');
        }
    };
    return jouer;

})();