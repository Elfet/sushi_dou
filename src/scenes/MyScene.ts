import Phaser from "phaser";
import { Npc } from "./npc";
import { Chair } from "./chair";
import { NpcAnim } from "./npcAnimation";
import { Player } from "../objects/charactors/player";
import { Food } from '../objects/foods/food';

export class MyScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private staticInterior!: Phaser.Physics.Arcade.StaticGroup;
  private npc_0! : Npc;
  private npc_1! : Npc;
  private npc_2! : Npc;
  private npc_3! : Npc;
  private npc_4! : Npc;
  private npc_5! : Npc;
  private npc_6! : Npc;
  private chair_0! : Chair;
  private chair_1! : Chair;
  private chair_2! : Chair;
  private npcAnimation! : NpcAnim; 
  private egg!: Food;
  private salmon!: Food;
  private shrimp!: Food;
  private tuna!: Food;
  private rice!: Food;

  constructor() {
    super({ key: 'myscene' });
  }

  preload() {
    this.load.image("map", "src/assets/maps/map_01.png");
    this.load.image("table", "src/assets/maps/counter_table.png");
    this.load.image('egg', 'src/assets/foods/egg.png');
    this.load.image('salmon', 'src/assets/foods/salmon.png');
    this.load.image('shrimp', 'src/assets/foods/shrimp.png');
    this.load.image('tuna', 'src/assets/foods/tuna.png');
    this.load.image('rice', 'src/assets/foods/rice.png');
    this.load.spritesheet(
      'player',
      'src/assets/characters/Chef_Alex_48x48.png',
      { frameWidth: 48, frameHeight: 96}
    );
    this.load.image("chair", "src/assets/maps/chair.png");
    this.load.spritesheet('npc_0', 'src/assets/characters/npc_female_0.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_1', 'src/assets/characters/npc_female_1.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_2', 'src/assets/characters/npc_male_0.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_3', 'src/assets/characters/npc_male_1.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_4', 'src/assets/characters/npc_male_2.png', { frameWidth: 48, frameHeight: 96 });
  }

  create() {
    // World生成
    this.add.image(400, 300, 'map').setScale(1.5);
    this.physics.world.setBounds(90, 80, 622, 495);
    this.cursors = this.input.keyboard.createCursorKeys();

    // 寿司画像生成
    this.egg = new Food(this.add, 250, 130, 'egg');
    this.salmon = new Food(this.add, 350, 130, 'salmon');
    this.shrimp = new Food(this.add, 450, 130, 'shrimp');
    this.tuna = new Food(this.add, 550, 130, 'tuna');
    this.rice = new Food(this.add, 650, 130, 'rice');

    // 固定オブジェクト生成
    this.staticInterior = this.physics.add.staticGroup();
    this.staticInterior.create(400, 339, 'table').setScale(1.5).refreshBody();

    // Player生成
    this.player = new Player(this.physics, this.anims, 400, 200, 'player');
    this.player.setCollider(this.staticInterior);
    // 椅子
    this.chair_0 = new Chair(this.add, 200, 370, 'chair');
    this.chair_1 = new Chair(this.add, 400, 370, 'chair');
    this.chair_2 = new Chair(this.add, 600, 370, 'chair');

    
    // npc生成
    this.npc_0 = new Npc(this.add, this.anims, 'npc_0');
    this.npc_0.sprite.play({key: 'walk_right', repeat: -1});
    this.npc_1 = new Npc(this.add, this.anims, 'npc_1');
    this.npc_2 = new Npc(this.add, this.anims, 'npc_2');
    this.npc_3 = new Npc(this.add, this.anims, 'npc_3');
    this.npc_4 = new Npc(this.add, this.anims, 'npc_4');
    this.npc_5 = new Npc(this.add, this.anims, 'npc_5');
    this.npc_6 = new Npc(this.add, this.anims, 'npc_6');

    // npcのアニメーション
    this.npcAnimation = new NpcAnim(
      this.npc_0.sprite,
      this.npc_1.sprite,
      this.npc_2.sprite,
      this.npc_3.sprite,
      this.npc_4.sprite,
      this.npc_5.sprite,
      this.npc_6.sprite,
      this.npc_0.npcName,
      this.npc_1.npcName,
      this.npc_2.npcName,
      this.npc_3.npcName,
      this.npc_4.npcName,
      this.npc_5.npcName,
      this.npc_6.npcName,
      this.chair_0.image,
      this.chair_1.image,
      this.chair_2.image,
      this.tweens,
      this.add,
    );

  }

  update () {
    // playerの行動
    this.player.onDownPlayerBehavior(this.cursors);
    // foodのstate check
    this.checkFoodSelected()
    this.npcAnimation.triggerNpcAnim();
  }

  checkFoodSelected() {
    if (this.cursors.space.isDown) {
      const [playerPositionX, playerPositionY] = this.player.getPlayerPosition()
      if ( 
        playerPositionX >= 200 && playerPositionX < 300 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.egg);
      }
      else if ( 
        playerPositionX >= 300 && playerPositionX < 400 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.salmon);
      }
      else if ( 
        playerPositionX >= 400 && playerPositionX < 500 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.shrimp);
      }
      else if ( 
        playerPositionX >= 500 && playerPositionX < 600 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.tuna);
      }
      else if ( 
        playerPositionX >= 600 && playerPositionX < 700 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.rice);
      }
    }
    if (this.cursors.space.isUp) {
      this.egg.setIsLoading(false);
      this.salmon.setIsLoading(false);
      this.shrimp.setIsLoading(false);
      this.tuna.setIsLoading(false);
      this.rice.setIsLoading(false);
    }
  }

  checkFoodState(food: Food): void {
    if (food.getIsLoading()) {
      return;
    }

    if (food.getIsSelected()) {
      food.onDownSelected(130, false, true);
    } 
    else {
      food.onDownSelected(100,true, true);
    }
  }


}