import Phaser from "phaser";
import { Npc } from "./npc";
import { Chair } from "./chair";
import { NpcAnim } from "./npcAnimation";
import { Player } from "../objects/charactors/player";

export class MyScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private staticInterior!: Phaser.Physics.Arcade.StaticGroup;
  private npc_0! : Npc;
  private npc_1! : Npc;
  private npc_2! : Npc;
  private chair_0! : Chair;
  private chair_1! : Chair;
  private chair_2! : Chair;
  private npcAnimation_0! : NpcAnim; 
  private npcAnimation_1! : NpcAnim; 
  private npcAnimation_2! : NpcAnim;

  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.image("map", "src/assets/maps/map_01.png");
    this.load.image("table", "src/assets/maps/counter_table.png")
    this.load.spritesheet(
      "player",
      "src/assets/characters/Chef_Alex_48x48.png",
      { frameWidth: 48, frameHeight: 96}
    )
    this.load.image("chair", "src/assets/maps/chair.png");
    this.load.spritesheet('npc_0', 'src/assets/characters/Chef_Alex_48x48.png', { frameWidth: 48, frameHeight: 96 });
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
    // 椅子
    this.chair_0 = new Chair(this.add, 200, 370, 'chair');
    this.chair_1 = new Chair(this.add, 400, 370, 'chair');
    this.chair_2 = new Chair(this.add, 600, 370, 'chair');

    
    // npc
    this.npc_0 = new Npc(this.add, this.anims, 'npc_0');
    this.npc_1 = new Npc(this.add, this.anims, 'npc_0');
    this.npc_2 = new Npc(this.add, this.anims, 'npc_0');

    // npcのアニメーション
    this.npcAnimation_0 = new NpcAnim(this.npc_0.sprite, this.chair_0.image, this.tweens, this.add, this.input, 'chair_0');
    this.npcAnimation_1 = new NpcAnim(this.npc_1.sprite, this.chair_1.image, this.tweens, this.add, this.input, 'chair_1');
    this.npcAnimation_2 = new NpcAnim(this.npc_2.sprite, this.chair_2.image, this.tweens, this.add, this.input, 'chair_2');

  }

  update () {
    this.player.onDownPlayerBehavior(this.cursors);
    this.npcAnimation_0.triggerNpcAnim();
    this.npcAnimation_1.triggerNpcAnim();
    this.npcAnimation_2.triggerNpcAnim();
  }


}