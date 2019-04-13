export class Fence extends Phaser.GameObjects.Rectangle {

    body:Phaser.Physics.Arcade.Body;

    constructor(params:{scene:Phaser.Scene,x:number,y:number,width:number,height:number}) {
        super(params.scene, params.x, params.y, params.width, params.height);

        this.init();
        this.scene.add.existing(this);

    }


    private init() {

        this.scene.physics.world.enable(this);
        
        this.body.setBounce(1,1);
        this.body.immovable = true;
    }
    update(): void {

    }
    
}