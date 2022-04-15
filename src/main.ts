import Phaser from "phaser";
import { MyScene } from "./scenes/MyScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade"
  },
  scene: MyScene,
};
new Phaser.Game(config);