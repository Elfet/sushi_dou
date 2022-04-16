import Phaser from "phaser";
import { Npc } from "../objects/charactors/npc";
import { Player } from "../objects/charactors/player";
import { Food } from '../objects/foods/food';

export class MyScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private staticInterior!: Phaser.Physics.Arcade.StaticGroup;
  private npc_0!: Npc;
  private npc_1!: Npc;
  private npc_2!: Npc;
  private npc_3!: Npc;
  private npc_4!: Npc;
  private npc_5!: Npc;
  private npc_6!: Npc;
  private chair_0!: Phaser.GameObjects.Image;
  private chair_1!: Phaser.GameObjects.Image;
  private chair_2!: Phaser.GameObjects.Image;
  private egg!: Food;
  private salmon!: Food;
  private shrimp!: Food;
  private tuna!: Food;
  private rice!: Food;
  // 椅子の状態を管理
  public isChair0Taken: boolean;
  public isChair1Taken: boolean;
  public isChair2Taken: boolean;
  // npcの状態を管理
  public isNpc0Visible: boolean;
  public isNpc1Visible: boolean;
  public isNpc2Visible: boolean;
  public isNpc3Visible: boolean;
  public isNpc4Visible: boolean;
  public isNpc5Visible: boolean;
  public isNpc6Visible: boolean;

  constructor() {
    super({ key: 'myscene' });
    this.isChair0Taken = false;
    this.isChair1Taken = false;
    this.isChair2Taken = false;
    this.isNpc0Visible = false;
    this.isNpc1Visible = false;
    this.isNpc2Visible = false;
    this.isNpc3Visible = false;
    this.isNpc4Visible = false;
    this.isNpc5Visible = false;
    this.isNpc6Visible = false;
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
    this.load.spritesheet('npc_2', 'src/assets/characters/npc_female_2.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_3', 'src/assets/characters/npc_male_0.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_4', 'src/assets/characters/npc_male_1.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_5', 'src/assets/characters/npc_male_2.png', { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_6', 'src/assets/characters/npc_male_3.png', { frameWidth: 48, frameHeight: 96 });
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
    this.chair_0 = this.add.image(200, 370, 'chair').setScale(1.5);
    this.chair_1 = this.add.image(400, 370, 'chair').setScale(1.5);
    this.chair_2 = this.add.image(600, 370, 'chair').setScale(1.5);
    
    // npc生成
    this.npc_0 = new Npc(this.add, 'npc_0', this.chair_0, this.chair_1, this.chair_2, this.tweens);
    this.npc_1 = new Npc(this.add, 'npc_1', this.chair_0, this.chair_1, this.chair_2, this.tweens);
    this.npc_2 = new Npc(this.add, 'npc_2', this.chair_0, this.chair_1, this.chair_2, this.tweens);
    this.npc_3 = new Npc(this.add, 'npc_3', this.chair_0, this.chair_1, this.chair_2, this.tweens);
    this.npc_4 = new Npc(this.add, 'npc_4', this.chair_0, this.chair_1, this.chair_2, this.tweens);
    this.npc_5 = new Npc(this.add, 'npc_5', this.chair_0, this.chair_1, this.chair_2, this.tweens);
    this.npc_6 = new Npc(this.add, 'npc_6', this.chair_0, this.chair_1, this.chair_2, this.tweens);
  }

  update () {
    // playerの行動
    this.player.onDownPlayerBehavior(this.cursors);
    // foodのstate check
    this.checkFoodSelected();
    // Npcのアニメーション
    this.updateNpcAnimation('chair_0');
    this.updateNpcAnimation('chair_1');
    this.updateNpcAnimation('chair_2');
  }

  updateNpcAnimation(chair: string):void {
    if (chair === 'chair_0' && !this.isChair0Taken) {
      this.isChair0Taken = true;
      setTimeout(()=>{
        this.isChair0Taken = false;
      }, 7500)
      if (!this.isNpc0Visible) {
        this.isNpc0Visible = true;
        this.npc_0.updateAnimation('chair_0');
      } else if (!this.isNpc1Visible) {
        this.isNpc1Visible = true;
        this.npc_1.updateAnimation('chair_0');
      } else if (!this.isNpc2Visible) {
        this.isNpc2Visible = true;
        this.npc_2.updateAnimation('chair_0');
      } else if (!this.isNpc3Visible) {
        this.isNpc3Visible = true;
        this.npc_3.updateAnimation('chair_0');
      } else if (!this.isNpc4Visible) {
        this.isNpc4Visible = true;
        this.npc_4.updateAnimation('chair_0');
      } else if (!this.isNpc5Visible) {
        this.isNpc5Visible = true;
        this.npc_5.updateAnimation('chair_0');
      } else if (!this.isNpc6Visible) {
        this.isNpc6Visible = true;
        this.npc_6.updateAnimation('chair_0');
      } else {
        this.isNpc0Visible = false;
        this.isNpc1Visible = false;
        this.isNpc2Visible = false;
        this.isNpc3Visible = false;
        this.isNpc4Visible = false;
        this.isNpc5Visible = false;
        this.isNpc6Visible = false;
      }
    } 
    if (chair === 'chair_1' && !this.isChair1Taken) {
      this.isChair1Taken = true;
      setTimeout(()=>{
        this.isChair1Taken = false;
      }, 6000)
      if (!this.isNpc0Visible) {
        this.isNpc0Visible = true;
        this.npc_0.updateAnimation('chair_1');
      } else if (!this.isNpc1Visible) {
        this.isNpc1Visible = true;
        this.npc_1.updateAnimation('chair_1');
      } else if (!this.isNpc2Visible) {
        this.isNpc2Visible = true;
        this.npc_2.updateAnimation('chair_1');
      } else if (!this.isNpc3Visible) {
        this.isNpc3Visible = true;
        this.npc_3.updateAnimation('chair_1');
      } else if (!this.isNpc4Visible) {
        this.isNpc4Visible = true;
        this.npc_4.updateAnimation('chair_1');
      } else if (!this.isNpc5Visible) {
        this.isNpc5Visible = true;
        this.npc_5.updateAnimation('chair_1');
      } else if (!this.isNpc6Visible) {
        this.isNpc6Visible = true;
        this.npc_6.updateAnimation('chair_1');
      } else {
        this.isNpc0Visible = false;
        this.isNpc1Visible = false;
        this.isNpc2Visible = false;
        this.isNpc3Visible = false;
        this.isNpc4Visible = false;
        this.isNpc5Visible = false;
        this.isNpc6Visible = false;
      }
    }
    if (chair === 'chair_2' && !this.isChair2Taken) {
      this.isChair2Taken = true;
      setTimeout(()=>{
        this.isChair2Taken = false;
      }, 6500)
      if (!this.isNpc0Visible) {
        this.isNpc0Visible = true;
        this.npc_0.updateAnimation('chair_2');
      } else if (!this.isNpc1Visible) {
        this.isNpc1Visible = true;
        this.npc_1.updateAnimation('chair_2');
      } else if (!this.isNpc2Visible) {
        this.isNpc2Visible = true;
        this.npc_2.updateAnimation('chair_2');
      } else if (!this.isNpc3Visible) {
        this.isNpc3Visible = true;
        this.npc_3.updateAnimation('chair_2');
      } else if (!this.isNpc4Visible) {
        this.isNpc4Visible = true;
        this.npc_4.updateAnimation('chair_2');
      } else if (!this.isNpc5Visible) {
        this.isNpc5Visible = true;
        this.npc_5.updateAnimation('chair_2');
      } else if (!this.isNpc6Visible) {
        this.isNpc6Visible = true;
        this.npc_6.updateAnimation('chair_2');
      } else {
        this.isNpc0Visible = false;
        this.isNpc1Visible = false;
        this.isNpc2Visible = false;
        this.isNpc3Visible = false;
        this.isNpc4Visible = false;
        this.isNpc5Visible = false;
        this.isNpc6Visible = false;
      }
    }
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