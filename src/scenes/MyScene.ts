import Phaser from "phaser";
import { Player } from "../objects/charactors/player";

export class MyScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private staticInterior!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.image("map", "src/assets/maps/map_01.png")
    this.load.image("table", "src/assets/maps/counter_table.png")
    this.load.spritesheet(
      "player",
      "src/assets/characters/Chef_Alex_48x48.png",
      { frameWidth: 48, frameHeight: 96}
    )
  }

  create() {
    // World生成
    this.add.image(400, 300, "map").setScale(1.5);
    this.physics.world.setBounds(90, 80, 622, 495);
    this.cursors = this.input.keyboard.createCursorKeys();

    // 固定オブジェクト生成
    this.staticInterior = this.physics.add.staticGroup();
    this.staticInterior.create(400, 339, "table").setScale(1.5).refreshBody();

    // Player生成
    this.player = new Player(this.physics, this.anims, 400, 200, 'player');
    this.player.setCollider(this.staticInterior);
  }

  update() {
    this.player.onDownPlayerBehavior(this.cursors);
  }
}