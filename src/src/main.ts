import Phaser from "phaser";
import { MyScene } from "./scenes/MyScene";
import { scoreCenter } from "./scenes/score-center";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  dom: {
    createContainer: true
  },
  physics: {
    default: "arcade"
  },
  scene: MyScene,
};

const game: Phaser.Game = new Phaser.Game(config);

export default class GameHighScore {
  private highScore: number;
  constructor ()
  {
    this.highScore = 0;
    scoreCenter.on('update-highScore', ()=>{this.updateScore()}, game);
  }

  updateScore():void {
    this.highScore = game.registry.get('highScore');
  }

  getScore ():number {
    return this.highScore;
  }

}

