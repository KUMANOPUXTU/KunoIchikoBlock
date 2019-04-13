export class Bar extends Phaser.GameObjects.Image {
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private sceneinput: Phaser.Input.InputPlugin;
    private speed: number = 450;
    private ismoved: boolean = false;
    private world:Phaser.Physics.Arcade.World;
    body:Phaser.Physics.Arcade.Body;

    /**
     * コンストラクタ
     * @param params 
     */
    constructor(params:{
        scene:Phaser.Scene,x:number,
        y:number,key:string,
        world:Phaser.Physics.Arcade.World,
        frame?:string|number,
        
    }) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.world=params.world;
        this.init();
        this.scene.add.existing(this);

    }

    /**
     * 左キーに相当する入力が押下されているか
     */
    get leftKeyDown(): boolean {
        return this.cursors.left.isDown;
    }

    /**
     * 右キーに相当する入力が押下されているか
     */
    get rightKeyDown(): boolean {
        return this.cursors.right.isDown;
    }
    
    /**
     * 初期化処理
     */
    private init() {
        // input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.sceneinput = this.scene.input;
        
        this.world.enable(this);
        this.body.setBounce(-1,-1);
        this.body.height=1;
        this.body.collideWorldBounds = true;
        this.body.checkCollision.down=false;
        this.body.checkCollision.left=false;
        this.body.checkCollision.right=false;
        this.body.checkCollision.up=true;
        this.body.setImmovable(true);
        
    }

    /**
     * 更新時処理
     */
    update(): void {
        if (this.active) {
            this.handleInput();
        } else {
            this.destroy();
        }
    }

    /**
     * 指定した速度で移動
     * @param x_velocity X軸速度
     */
    move(x_velocity: number): void {
        this.body.setVelocity(x_velocity, 0);
    }

    /**
     * 入力に応じた制御
     */
    private handleInput() {
        if (this.leftKeyDown)
            this.move(-this.speed);
        else if (this.rightKeyDown)
            this.move(this.speed);
        else
            this.move(0);
    }
}