import Phaser from 'phaser';
import { Player } from '../objects/charactors/player';

export class MyScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private staticInterior!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.image('map', 'src/assets/maps/map_01.png');
    this.load.image('table', 'src/assets/maps/counter_table.png');
    this.load.image('egg', 'src/assets/foods/egg.png');
    this.load.image('rice', 'src/assets/foods/rice.png');
    this.load.image('salmon', 'src/assets/foods/salmon.png');
    this.load.image('shrimp', 'src/assets/foods/shrimp.png');
    this.load.image('tuna', 'src/assets/foods/tuna.png');
    this.load.spritesheet(
      'player',
      'src/assets/characters/Chef_Alex_48x48.png',
      { frameWidth: 48, frameHeight: 96}
    );
  }

  create() {
    // World生成
    this.add.image(400, 300, 'map').setScale(1.5);
    this.physics.world.setBounds(90, 80, 622, 495);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(250, 130, 'egg');
    this.add.image(350, 130, 'salmon');
    this.add.image(450, 130, 'shrimp');
    this.add.image(550, 130, 'tuna');
    this.add.image(650, 130, 'rice');

    // 固定オブジェクト生成
    this.staticInterior = this.physics.add.staticGroup();
    this.staticInterior.create(400, 339, 'table').setScale(1.5).refreshBody();
    // this.staticInterior.create(300, 130, 'tuna').refreshBody()

    // Player生成
    this.player = new Player(this.physics, this.anims, 400, 200, 'player');
    this.player.setCollider(this.staticInterior);
  }

  update() {
    this.player.onDownPlayerBehavior(this.cursors);
  }
}