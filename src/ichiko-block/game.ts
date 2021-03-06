/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { MainScene } from "./scenes/mainScene";
import { Physics } from "phaser";

// main game configuration
const config: GameConfig = {
  width: 960,
  height: 540,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: {
      debug:true,
      x:231,
      y:41,
      width:720,
      height:410,
      debugShowBody:true
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new Game(config);
});
