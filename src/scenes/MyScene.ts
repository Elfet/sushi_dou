
import Phaser from "phaser";

let npc_0: any;
let npc_1: any;
let npc_2: any;
let npc_3: any;

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
    npc_0 = this.add.sprite(360, 510, 'npc_0').setScale(1.5);
    npc_1 = this.add.sprite(430, 510, 'npc_0').setScale(1.5);
    npc_2 = this.add.sprite(430, 510, 'npc_0').setScale(1.5);
    // npc_3 = this.add.sprite(400, 500, 'npc_0').setScale(1.5);
    // npcのアニメーション
    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 60, end: 65 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 48, end: 53 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 66, end: 71 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('npc_0', { start: 54, end: 59 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'sit',
      frames: [ { key: 'npc_0', frame: 30 } ],
      frameRate: 20
    });

    npc_0.visible = false;
    npc_1.visible = false;
    npc_2.visible = false;
    console.log(npc_0)

    this.npcAnimation_0(npc_0);
    setTimeout(()=>{this.npcAnimation_1(npc_1)},1000)
    setTimeout(()=>{this.npcAnimation_2(npc_2)},3000)

  }

  update () {
    // npc_0.setVelocityX(160);
    // npc_0.anims.play('right', true);
  }


  npcAnimation_0 (targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.npcWalkIn(420, targets);
    setTimeout(()=>{this.npcWalkLeft(200, targets, 2000)}, 2000);
    setTimeout(()=>{this.npcWalkUpToChair(380, targets)}, 4000);
    setTimeout(()=>{this.npcWalkDownFromChair(420, targets)}, 7000);
    setTimeout(()=>{this.npcWalkRight(360, targets, 2000)}, 8000);
    setTimeout(()=>{this.npcWalkDown(510, targets)}, 10000);
    setTimeout(()=>{this.npcDisappear(targets)}, 12000);
  }

  npcAnimation_1 (targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.npcWalkIn(420, targets);
    setTimeout(()=>{this.npcWalkLeft(390, targets, 1000)}, 2000);
    setTimeout(()=>{this.npcWalkUpToChair(380, targets)}, 3000);
    setTimeout(()=>{this.npcWalkDownFromChair(420, targets)}, 5000);
    setTimeout(()=>{this.npcWalkRight(430, targets, 1000)}, 6000);
    setTimeout(()=>{this.npcWalkDown(510, targets)}, 7000);
    setTimeout(()=>{this.npcDisappear(targets)}, 9000);
  }

  npcAnimation_2 (targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.npcWalkIn(420, targets);
    setTimeout(()=>{this.npcWalkRight(610, targets, 2000)}, 2000);
    setTimeout(()=>{this.npcWalkUpToChair(380, targets)}, 4000);
    setTimeout(()=>{this.npcWalkDownFromChair(420, targets)}, 6000);
    setTimeout(()=>{this.npcWalkLeft(430, targets, 2000)}, 7000);
    setTimeout(()=>{this.npcWalkDown(510, targets)},9000);
    setTimeout(()=>{this.npcDisappear(targets)}, 11000);
  }

  // 店に入ってくる
  npcWalkIn (y: number, targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    targets.visible = true;
    targets.play({key: 'walk_up', repeat: 1});
    this.tweens.add({
      targets: targets,
      y: y,
      duration: 2000,
      ease: 'Linear'
    })
  };

  // 左に歩く
  npcWalkLeft (x: number, targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, duraion: number) {
    targets.play({key: 'walk_left', repeat: 1});
    this.tweens.add({
      targets: targets,
      x: x,
      duration: duraion,
      ease: 'Linear'
    })
  };

  // 椅子に向かって歩く
  npcWalkUpToChair (y: number, targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    targets.play({key: 'walk_up', repeat: 0});
    this.tweens.add({
      targets: targets,
      y: y,
      duration: 1000,
      ease: 'Linear'
    })
  };

  // 椅子から立って歩く
  npcWalkDownFromChair (y: number, targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    targets.play({key: 'walk_down', repeat: 0});
    this.tweens.add({
      targets: targets,
      y: y,
      duration: 1000,
      ease: 'Linear'
    })
  };

  // 右に歩く
  npcWalkRight (x: number, targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, duraion: number) {
    targets.play({key: 'walk_right', repeat: 1});
    this.tweens.add({
      targets: targets,
      x: x,
      duration: duraion,
      ease: 'Linear'
    })
  };

  // 店から出る
  npcWalkDown (y: number, targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    targets.play({key: 'walk_down', repeat: 1});
    this.tweens.add({
      targets: targets,
      y: y,
      duration: 2000,
      ease: 'Linear'
    })
  }

  // 店から出たので消える
  npcDisappear (targets: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    targets.visible = false;
  }
}