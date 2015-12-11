/* 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2015-12-10
 * @license The MIT License (MIT) Copyright (c) 2015 Jonathan Martel
 * 
 */

var jouer = (function () {

    var jouer = function (jeu) {
        _jeu = jeu;
    };
    jouer.prototype = {
        create: function () { // À la creation du jeu 
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            Phaser.Physics.enableBody = true;

            _jeu.heros = _jeu.add.sprite(64, 64, 'chevre');
            _jeu.heros.animations.add('idle', Phaser.Animation.generateFrameNames('chevre_idle', 0, 79, '', 4), 30, true);
            _jeu.heros.animations.add('marche', Phaser.Animation.generateFrameNames('chevre_marche', 0, 29, '', 4), 30, true);

            _jeu.heros.scale = new Phaser.Point(.21, .21);
            _jeu.heros.vitesse = 200;



            _jeu.pgFleurs = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
            _jeu.pgFleurs.create(64 * 3, 64 * 5, "fleur");
            _jeu.pgFleurs.create(64 * 1, 64 * 5, "fleur");
            _jeu.pgFleurs.create(64 * 3, 64 * 1, "fleur");
            _jeu.pgFleurs.create(64 * 3, 64 * 8, "fleur");
            _jeu.pgFleurs.create(64 * 7, 64 * 6, "fleur");
            _jeu.pgFleurs.setAll('body.immovable', true);


            _jeu.mesEnnemis = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
            _jeu.mesEnnemis.create(64 * 5, 64 * 8, "loup");
            _jeu.mesEnnemis.create(64 * 6, 64 * 1, "loup");
            _jeu.mesEnnemis.setAll('body.velocity.x', 150);
            
            _jeu.mesEnnemis.setAll('scale', new Phaser.Point(.21, .21));
            _jeu.mesEnnemis.setAll('body.immovable', true);
            _jeu.mesEnnemis.callAll('animations.add', "animations", "loup_marche");
            _jeu.mesEnnemis.callAll('animations.play', "animations", "loup_marche", 30, true);



            _jeu.physics.enable(_jeu.heros);

            _jeu.heros.body.collideWorldBounds = true;



            _jeu.niveau = _jeu.add.tilemap('carte');

            _jeu.niveau.addTilesetImage('tuiles');
            _jeu.couche = {
                "sol": _jeu.niveau.createLayer('sol'),
                "mur": _jeu.niveau.createLayer('mur')
            };

            _jeu.couche.sol.resizeWorld();
            _jeu.couche.mur.resizeWorld();
            _jeu.niveau.setCollisionBetween(7, 8, true, _jeu.couche.mur);
            //_jeu.couche.mur.debug = true;
            //_jeu.couche.sol.debug = true;
			
			_jeu.bandeau = _jeu.add.sprite(0,0, 'bandeau');
			_jeu.bandeau.height = 35;
			_jeu.bandeau.width = 768;
			_jeu.bandeau.alpha = .75;

            _jeu.curseur = _jeu.input.keyboard.createCursorKeys();
            
			_jeu.txtTemps = _jeu.add.text(0,0, "Temps : 00:00");
			var monStyle = {font: "Georgia", fontWeight: "bold", fill:"#FF0000", fontSize : 50};
            _jeu.txtTemps.setStyle(monStyle);
			_jeu.world.bringToTop(_jeu.heros);
            _jeu.world.bringToTop(_jeu.mesEnnemis);
            _jeu.world.bringToTop(_jeu.pgFleurs);
			
			_jeu.tempsDebut = _jeu.time.now;
			
        },
        update: function () { // Sur chaque frame
            _jeu.physics.arcade.collide(_jeu.heros, _jeu.couche.mur);
            _jeu.physics.arcade.collide(_jeu.heros, _jeu.couche.sol);
            _jeu.physics.arcade.collide(_jeu.mesEnnemis, _jeu.couche.mur, this.changeDirection);
            _jeu.physics.arcade.collide(_jeu.mesEnnemis, _jeu.couche.sol, this.changeDirection);
            _jeu.physics.arcade.overlap(_jeu.mesEnnemis, _jeu.mesEnnemis, this.changeDirection);
            _jeu.physics.arcade.collide(_jeu.mesEnnemis, _jeu.heros, this.toucher);
            _jeu.physics.arcade.collide(_jeu.pgFleurs, _jeu.heros, this.ramasser);


            _jeu.heros.body.velocity.set(0);
            if (_jeu.curseur.up.isDown) {
                _jeu.heros.body.velocity.y -= _jeu.heros.vitesse;
            }
            if (_jeu.curseur.down.isDown) {
                _jeu.heros.body.velocity.y += _jeu.heros.vitesse;
            }
            if (_jeu.curseur.left.isDown) {
                _jeu.heros.body.velocity.x -= _jeu.heros.vitesse;
            }
            if (_jeu.curseur.right.isDown) {
                _jeu.heros.body.velocity.x += _jeu.heros.vitesse;
            }
            if (_jeu.heros.body.velocity.x == 0 && _jeu.heros.body.velocity.y == 0) {
                _jeu.heros.animations.play('idle', 30, true);

            } else {
               
                _jeu.heros.animations.play('marche', 30, true);
            }
			var temps = new Date(_jeu.time.now - _jeu.tempsDebut);
			var min = ('0' + temps.getMinutes()).slice(-2);
			
			var sec = ('0' + temps.getSeconds()).slice(-2);
			
			_jeu.txtTemps.setText("Temps : "+min+":"+sec);
        },
		render : function()
		{
			
		},
        toucher: function () {
            console.log('ouch');
            _jeu.state.start("Perdant");
        },
        changeDirection: function (element, element2) {
            if (element != element2) {
                switch (Math.ceil(Math.random() * 4)) {
                    case 1:
                        element.body.velocity.x = 150;
                        break;
                    case 2:
                        element.body.velocity.x = -150;
                        break;
                    case 3:
                        element.body.velocity.y = 150;
                        break;
                    case 4:
                        element.body.velocity.y = -150;
                        break;
                }

            }

        },
        ramasser: function (perso, fleur) {

            _jeu.pgFleurs.removeChild(fleur);
            fleur.destroy();
            if(_jeu.pgFleurs.length == 0)
            {
                _jeu.state.start("Gagnant");
            }
        }

    };
    return jouer;

})();