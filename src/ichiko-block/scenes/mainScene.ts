
import { Bar } from './../objects/bar';
import { Ball } from './../objects/ball';
import { Fence } from './../objects/fence';
import { Tilemaps } from 'phaser';
/**
 * @author       PUXTU
 */

class tileprops {
  life;
}
export class MainScene extends Phaser.Scene {
  private BackGround: Phaser.GameObjects.Sprite;
  private IchikoFace: Phaser.GameObjects.Sprite;

  private Map: Tilemaps.Tilemap;
  private Player: Bar;
  private Ball: Ball;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private ismoved: boolean;
  private level_layer: Tilemaps.DynamicTilemapLayer;
  private is_win = false;
  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.pack("pack", "./src/ichiko-block/assets/pack.json", "preload");
    this.load.image("tiles", "./src/ichiko-block/tiles/example/example.png")
    this.load.image("chaoko", "./src/ichiko-block/tiles/example/chaoko.jpg")
    this.load.tilemapTiledJSON("stage", "./src/ichiko-block/tiles/example/map.json")

  }

  create(): void {

    this.cursors = this.input.keyboard.createCursorKeys();
    // this.gameWorld = new Phaser.Physics.Arcade.World(this,{
    //   x:this.gameOriginX,y:this.gameOriginY,
    //   width:this.gameWidth,height:this.gameHeight,
    //   debug:true,debugShowBody:true
    // })


    this.BackGround = this.add.sprite(480, 270, "background");
    this.IchikoFace = this.add.sprite(120, 490, "smileIchiko").setDisplaySize(150, 150);
    this.Map = this.make.tilemap({ key: "stage" });
    this.Map.images.forEach((e) => {
      //console.log(e)
      if (e.name === "Image")
        this.add.sprite(e.x + 231 + 160, e.y + 41 + 150, "chaoko");
    })

    const block = this.Map.addTilesetImage("Blocks", "tiles")

    this.level_layer = this.Map.createDynamicLayer("Level", block, 231, 41);

    this.level_layer.setCollisionBetween(1, 3);
    this.level_layer.setTileIndexCallback(1, this.tileDelete, this);
    this.level_layer.setTileIndexCallback(2, this.tileDelete, this);
    this.level_layer.setTileIndexCallback(3, this.tileDelete, this);
    // this.Fences = [new Fence({
    //   scene: this, x: this.gameOriginX-this.FenceWidth*0.5, y: this.gameOriginY+this.gameHeight*0.5, width: this.FenceWidth, height: this.gameHeight
    // }), new Fence({
    //   scene: this, x: this.gameOriginX+this.FenceWidth*0.5+this.gameWidth, y: this.gameOriginY+this.gameHeight*0.5, width: this.FenceWidth, height: this.gameHeight
    // }), new Fence({
    //   scene: this, x: this.gameOriginX+this.gameWidth*0.5, y: this.gameOriginY-this.FenceWidth*0.5, width: this.gameWidth, height: this.FenceWidth
    // })];
    this.Player = new Bar({
      x: 600, y: 420, scene: this, key: "bar", world: this.physics.world
    })
    this.Ball = new Ball({
      x: 600, y: 400, scene: this, key: "ball", player: this.Player, world: this.physics.world
    })
    this.Ball.bind_bar(this.Player);
    this.input.keyboard.once("keydown", () => {
      setTimeout(() => {
        this.Ball.unbind_bar();
      }, 2000);
    })

    this.physics.add.collider(this.Player, this.Ball);
    this.physics.add.collider(this.Ball, this.level_layer);
  }

  tileDelete(sprite: Ball, tile) {
    tile.properties.life -= 1;
    if (tile.properties.life == 0) {
      this.level_layer.removeTileAt(tile.x, tile.y);
    }
  }
  winCheck() {
    if (!this.is_win) {
      const tiles = this.level_layer.filterTiles(x => x.properties.life >= 1);
      if (tiles.length == 0) {
      
        this.is_win = true;
        setTimeout(()=>{
          alert("かち")
          this.physics.pause();
        },20)

      }
    }
  }
  update() {

    this.Player.update();
    this.Ball.update();
    this.winCheck();
  }

  render() {
  }
}
