import Phaser from "phaser";
import { MyScene } from "./scenes/MyScene";
import { PhaserMatterCollisionPlugin } from 'phaser-matter-collision-plugin';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade"
  },
  // plugins: {
  //   scene: [
  //     {
  //       plugin: PhaserMatterCollisionPlugin,
  //       key: 'matterCollision',
  //       mapping: 'matterCollision'
  //     }
  //   ]
  // },
  scene: MyScene,
};
new Phaser.Game(config);