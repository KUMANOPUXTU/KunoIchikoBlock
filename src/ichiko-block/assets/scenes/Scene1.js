
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
	
		var background = this.add.image(0.0, 0.0, "background");
		background.setOrigin(0.0, 0.0);
		
		var smileIchiko = this.add.image(117.802345, 476.94913, "smileIchiko");
		smileIchiko.setScale(0.4, 0.4);
		
		var Marble02 = this.add.image(640.09424, 280.81662, "Marble02");
		Marble02.setScale(0.1, 0.1);
		
		var chocomint = this.add.image(621.4904, 420.0, "chocomint");
		chocomint.name = "chocomint";
		chocomint.setScale(0.5, 0.5);
		
		this.fBg = this.add.group([  ]);
		
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
	}

	update() {
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
