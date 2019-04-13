import { Bar } from './bar';
export class Ball extends Phaser.GameObjects.Image {
    //private cursors: Phaser.Input.Keyboard.CursorKeys;
    public y_speed: number = 200;
    public x_speed: number = 100;
    private binded_bar: Bar = null;
    private player_bar: Bar = null;
    body: Phaser.Physics.Arcade.Body;
    private initial_y_offset: number = 16;
    private initial_x_offset: number = 16;
    private world:Phaser.Physics.Arcade.World;
    private bounce_x: number = 8;

    constructor(params:{
        scene:Phaser.Scene,x:number,
        y:number,key:string,
        world:Phaser.Physics.Arcade.World,
        player:Bar,
        frame?:string|number,
        
    }) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.world=params.world;
        this.init();
        this.player_bar = params.player;
        this.scene.add.existing(this);

    }
    private collision_check(
        go1: Phaser.GameObjects.GameObject,
        go2: Phaser.GameObjects.GameObject,
        target: Phaser.GameObjects.GameObject): boolean {
        if ((go1 == target && go2 == this) || (go2 == target && go1 == this)) {
            return true;
        }
        return false;
    }
    private init() {
        // input
        //this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.world.enable(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
        this.body.onCollide = true;
        this.body.onWorldBounds = true;
        this.body.setMaxSpeed(400);
        this.world.on("collide", (
            go1: Phaser.GameObjects.GameObject,
            go2: Phaser.GameObjects.GameObject,
            b1: Phaser.Physics.Arcade.Body,
            b2: Phaser.Physics.Arcade.Body, ) => {
            if (this.collision_check(go1, go2, this.player_bar)) {

                //衝突時のバーとボールのX軸座標の差分で、反射角度を調整する
                let diff_x = (b1.center.x - b2.center.x) * this.bounce_x;
                if (go1 == this)
                    diff_x = -diff_x;

                //中央に近いところで衝突した場合は、そのまま反射する
                if (Math.abs(diff_x) < 30)
                    this.body.setVelocityX(this.body.velocity.x);
                //中央から外れたところで衝突した場合は、反射角にインチキを加える
                else
                    this.body.setVelocityX(-diff_x);
                
                //Y軸速度はバーに戻ってきた時点で定数値にもどしてあげる
                this.body.setVelocityY(-this.y_speed + Math.abs(diff_x) * 0.2);
                
            }
        })

    }

    bind_bar(bar: Bar) {
        this.binded_bar = bar;
    }
    unbind_bar() {
        this.binded_bar = null;
        this.body.setVelocity(this.x_speed, this.y_speed);
    }

    move() {

        if (this.binded_bar) {
            this.x = this.binded_bar.x + this.initial_x_offset;
            this.y = this.binded_bar.y - this.initial_y_offset;
            return;
        } else {
            //this.body.setVelocity(this.x_speed, this.y_speed);
        }
    }


    update(): void {
        if (this.active) {
            this.move();
        } else {
            this.destroy();
        }
    }
}