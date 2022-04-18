import Phaser from "phaser";
import { TimeBar } from "../objects/charactors/npc-timebar";
import { Npc } from "../objects/charactors/npc";
import { Chair } from "../objects/chair";
import { Player } from "../objects/charactors/player";
import { Food } from '../objects/foods/food';
import { OrderEmote } from "../objects/charactors/order-emote";

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
  private chair_0!: Chair;
  private chair_1!: Chair;
  private chair_2!: Chair;
  private egg!: Food;
  private salmon!: Food;
  private shrimp!: Food;
  private tuna!: Food;
  private rice!: Food;
  private timeBar_0!: TimeBar;
  private timeBar_1!: TimeBar;
  private timeBar_2!: TimeBar;
  private emote_0!: OrderEmote;
  private emote_1!: OrderEmote;
  private emote_2!: OrderEmote;

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
    this.load.image('egg_nigiri', 'src/assets/foods/egg_nigiri.png');
    this.load.image('salmon-nigiri', 'src/assets/foods/salmon-nigiri.png');
    this.load.image('tuna_nigiri', 'src/assets/foods/tuna_nigiri.png');
    this.load.image('shrimp_nigiri', 'src/assets/foods/shrimp_nigiri.png');
    this.load.image('sashimi_set', 'src/assets/foods/sashimi_set.png');
    this.load.image('emote_base', 'src/assets/characters/emote_base.png');
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
    this.chair_0 = new Chair(200, 370, 'chair', this.add);
    this.chair_1 = new Chair(400, 370, 'chair', this.add);
    this.chair_2 = new Chair(600, 370, 'chair', this.add);
    
    // npc生成
    this.npc_0 = new Npc(this.add, 'npc_0', this.tweens);
    this.npc_1 = new Npc(this.add, 'npc_1', this.tweens);
    this.npc_2 = new Npc(this.add, 'npc_2', this.tweens);
    this.npc_3 = new Npc(this.add, 'npc_3', this.tweens);
    this.npc_4 = new Npc(this.add, 'npc_4', this.tweens);
    this.npc_5 = new Npc(this.add, 'npc_5', this.tweens);
    this.npc_6 = new Npc(this.add, 'npc_6', this.tweens);

    // npcの待ち時間ゲージ
    this.timeBar_0 = new TimeBar(this, this.add ,170, 275);
    this.timeBar_1 = new TimeBar(this, this.add ,370, 275);
    this.timeBar_2 = new TimeBar(this, this.add ,570, 275);

    // npcのふきだし
    this.emote_0 = new OrderEmote(270, 320, this.add);
    this.emote_1 = new OrderEmote(470, 320, this.add);
    this.emote_2 = new OrderEmote(670, 320, this.add);
  }

  update () {
    // playerの行動
    this.player.onDownPlayerBehavior(this.cursors);
    // foodのstate check
    this.checkFoodSelected();
    // Npcのアニメーション
    this.updateNpcAnimation(this.npc_0);
    this.updateNpcAnimation(this.npc_1);
    this.updateNpcAnimation(this.npc_2);
    this.updateNpcAnimation(this.npc_3);
    this.updateNpcAnimation(this.npc_4);
    this.updateNpcAnimation(this.npc_5);
    this.updateNpcAnimation(this.npc_6);
  }

  updateAnimation(npc: Npc, chair: Chair, emote: OrderEmote ,timeBar: TimeBar, duration: number ,walkToChair: Function, leaveChair: Function) {
    // npcを表示し、isOnMoveを更新
    npc.updateVisible(true);
    npc.updateIsOnMove(true);
    // オーダーを更新
    npc.orderRandom();
    // 椅子に向かう
    walkToChair();
    // npcを座らせるのでisTakenを更新
    chair.updateState(true);
    // npcが座るタイミングでdepthとisOnChairを更新する
    setTimeout(()=>{
      npc.sitOnChair(true, 1);
      // タイムゲージ表示＆減少
      timeBar.updateVisible(true);
      timeBar.decrease(npc.getWaitTime());
      // オーダーの表示
      emote.displayEmote(npc.getOrder());
    }, duration)
    // npcのwaitTimeプロパティを参照して椅子から離れる
    setTimeout(()=>{
      npc.sitOnChair(false, 3);
      chair.updateState(false);
      leaveChair();
      // ゲージを非表示
      timeBar.updateVisible(false);
      // オーダーの非表示
      emote.hideEmote();
    }, duration + npc.getWaitTime())
    // 店から出る
    setTimeout(()=>{
      npc.updateIsOnMove(false);
      npc.updateVisible(false);
    }, duration + npc.getWaitTime() + duration);
  }

  updateNpcAnimation(npc: Npc):void {
    if (!this.chair_0.getIsTaken() && !npc.getIsOnMove() && !npc.getIsOnChair()) {
      this.updateAnimation(npc, this.chair_0, this.emote_0, this.timeBar_0, 4500, ()=>{npc.walkToChair_0()}, ()=>{npc.leaveChair_0()});
    }
    else if (!this.chair_1.getIsTaken() && !npc.getIsOnMove() && !npc.getIsOnChair()) {
      this.updateAnimation(npc, this.chair_1, this.emote_1, this.timeBar_1, 3000, ()=>{npc.walkToChair_1()}, ()=>{npc.leaveChair_1()});
    }
    else if (!this.chair_2.getIsTaken() && !npc.getIsOnMove() && !npc.getIsOnChair()) {
      this.updateAnimation(npc, this.chair_2, this.emote_2, this.timeBar_2, 4500, ()=>{npc.walkToChair_2()}, ()=>{npc.leaveChair_2()});
    }
    // 椅子が全て埋まっていて、かつnpcが動いていないとき
    else if (
      this.chair_0.getIsTaken() &&
      this.chair_1.getIsTaken() &&
      this.chair_2.getIsTaken() &&
      !npc.getIsOnMove() &&
      !npc.getIsOnChair()
    ) {
      npc.updateVisible(false);
    }
  };

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