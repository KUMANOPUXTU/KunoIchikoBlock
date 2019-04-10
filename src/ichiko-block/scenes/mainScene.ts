/**
 * @author       PUXTU
 */

export class MainScene extends Phaser.Scene {
  private BackGround: Phaser.GameObjects.Sprite;
  private IchikoFace: Phaser.GameObjects.Sprite;
  
  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("bg", "./src/ichiko-block/assets/background.png");
    this.load.image("si","./src/ichiko-block/assets/smileichiko.png");
  }

  create(): void {
    this.BackGround = this.add.sprite(480, 270, "bg");
    this.IchikoFace = this.add.sprite(120, 490, "si").setDisplaySize(150,150);
  }
}
