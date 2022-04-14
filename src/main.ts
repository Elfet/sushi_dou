import Phaser from "phaser";
import { MyScene } from "./scenes/MyScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
    },
  },
  scene: MyScene,
  pixelArt: true,
};
new Phaser.Game(config);

console.log('change')

console.log("change from feature/test branch")