#Fichier de démonstration de Phaser.io
Voici les quelques fichiers utilisés pour la démonstration de Phaser du 10 décembre 2015 au département TIM. J'ai corrigé certains petits éléments,
mais l'essentiel est là. 

##demoBase
Structure très simple pour montrer Phaser. Un seul fichier javascript, sans utilisé l'orienté objet.

##demoState
Utilisation de état (State) pour créer un jeu avec une structure plus intéressante et plus formelle. Divers states permettent de pré-charger des
ressources, d'afficher un menu, de jouer, etc. Phaser fonctionne un peu comme un automate ou bien une machine à état fini.

##Jeu_tuile
Démonstration d'un jeu simple (tiled base). C'est une petite démonstration du TP final du cours 345 que j'ai enseigné à la FC. Dans un niveau fait à partir
de tuiles (Logiciel Tiled - http://www.mapeditor.org/) il devait avoir un personnage animé qui se déplaçait et ramassait des objets en évitant les ennemis mobiles.
 

##plateforme
Jeu de plateforme avec chargement de niveau dynamique. C'est la démo la plus avancée que je fais dans le cours 448. Il utilise des objets qui
héritent des Sprites (Loup, Heros, Projectile), utilise un pool de ressource (les projectiles) et possède 2 niveaux qui sont chargés à partir d'un fichier JSON
maître (maitre.json), qui ensuite va charger les informations dans les JSON fils (plateforme_niv1.json)

## Feu d'artifice POO
Les démos présentés avant ne comprennent pas les tweens et les particules. J'inclus donc ici le code de démonstration d'un exercice (448) qui
utilise l'héritage, mais aussi les tweens et les systèmes de particules. Il permet de lancer des feux d'artifice sur le clic de la souris.


#Avertissement
Le code présenté n'a été écrit que pour développer mon mes cours. Il ne s'agit en rien de code de production. En ce sens, il n'est pas optimisé, ni 
testé exhaustivement. Il sert plutôt de "proof of concept".
