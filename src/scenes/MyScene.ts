
import Phaser from "phaser";

let npc_0: any;

export class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.image("map", "src/assets/maps/map_01.png");
    this.load.image("counter_table", "src/assets/maps/counter_table.png");
    this.load.spritesheet('npc_0', 'src/assets/characters/Chef_Alex_48x48.png', { frameWidth: 48, frameHeight: 96 });
  }

  

  create() {
    this.add.image(400, 300, "map").setScale(1.5);
    this.add.image(400, 339, "counter_table").setScale(1.5);

    // npc
    npc_0 = this.physics.add.sprite(400, 300, 'npc_0');
    // npcのアニメーション
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 60, end: 65 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 48, end: 53 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 66, end: 71 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 54, end: 59 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'sit',
      frames: [ { key: 'npc_0', frame: 2 } ],
      frameRate: 20
    });

    console.log(npc_0)

  }

  update () {
    // npc_0.setVelocityX(160);
    // npc_0.anims.play('right', true);
  }

  npcAnimate () {
    console.log(this)
    console.log("hello")
  }
}