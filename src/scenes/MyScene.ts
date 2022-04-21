import Phaser from "phaser";
import { TimeBar } from "../objects/charactors/npc-timebar";
import { Npc } from "../objects/charactors/npc";
import { Chair } from "../objects/chair";
import { Player } from "../objects/charactors/player";
import { Food } from '../objects/foods/food';
import { OrderEmote } from "../objects/charactors/order-emote";
import { ReactionEmote } from "../objects/charactors/reaction-emote";

export class MyScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private isSpacePressed!: boolean;
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
  private orderEmote_0!: OrderEmote;
  private orderEmote_1!: OrderEmote;
  private orderEmote_2!: OrderEmote;
  private reactionEmote_0!: ReactionEmote;
  private reactionEmote_1!: ReactionEmote;
  private reactionEmote_2!: ReactionEmote;
  private displayScore!: Phaser.GameObjects.Text;
  private score!: number;

  private foodMenu!: {[foodName: string]: Food[]};
  private music!: Phaser.Sound.BaseSound;
  private sound_correct!: Phaser.Sound.BaseSound;
  private sound_wrong!: Phaser.Sound.BaseSound;
  private sound_select_food!: Phaser.Sound.BaseSound;

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
    this.load.image('emote_happy', 'src/assets/characters/emote_happy.png');
    this.load.image('emote_heart', 'src/assets/characters/emote_heart.png');
    this.load.image('emote_tear', 'src/assets/characters/emote_tear.png');
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
    // 音楽
    this.load.audio('game-bgm', 'src/assets/music-sound/game-bgm_0.ogg');
    // 効果音
    this.load.audio('correct', 'src/assets/music-sound/sound-correct.mp3');
    this.load.audio('wrong', 'src/assets/music-sound/sound-wrong.mp3');
    this.load.audio('select_food', 'src/assets/music-sound/sound-select-food.mp3');
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
    this.orderEmote_0 = new OrderEmote(270, 320, this.add);
    this.orderEmote_1 = new OrderEmote(470, 320, this.add);
    this.orderEmote_2 = new OrderEmote(670, 320, this.add);

    // npcのリアクション
    this.reactionEmote_0 = new ReactionEmote(200, this.add, this.tweens);
    this.reactionEmote_1 = new ReactionEmote(400, this.add, this.tweens);
    this.reactionEmote_2 = new ReactionEmote(600, this.add, this.tweens);

    // scoreテキスト
    this.add.text(540, 30, 'SCORE:', { fontFamily: 'font1', color: 'black' }).setScale(1.5);
    this.displayScore = this.add.text(650, 30, '0', { fontFamily: 'font1', color: 'black' }).setScale(1.5);
    this.score = 0;

    this.foodMenu = {
      'salmon_nigiri': [this.salmon, this.rice],
      'tuna_nigiri': [this.tuna, this.rice],
      'shrimp_nigiri': [this.shrimp, this.rice],
      'egg_nigiri': [this.egg, this.rice],
      'sashimi_set': [this.salmon, this.tuna],
    }
    this.music = this.sound.add('game-bgm', {volume: 0.06, rate: 1.25, detune: -10, loop: true});

    this.music.play();
    // 効果音
    this.sound_correct = this.sound.add('correct', {volume: 0.07});
    this.sound_wrong = this.sound.add('wrong', {volume: 0.07});
    this.sound_select_food = this.sound.add('select_food', {volume: 0.04});
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

    this.checkFoodOrder();
    this.updateSpaceKey();
  }

  updateSpaceKey(): void{
    this.isSpacePressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
  };

  updateNpcAnimation(npc: Npc):void {
    // アニメーションの生成
    if (npc.getDidAnimationEnd() && !this.chair_0.getIsTaken()) {
      npc.animation0 = npc.walkToChair_0(
        (state: boolean)=>{this.chair_0.updateState(state)},
        (state: boolean)=>{this.timeBar_0.updateVisible(state)},
        ()=>{this.timeBar_0.decrease(npc.getWaitTime())},
        ()=>{this.orderEmote_0.displayEmote(npc.getOrder())},
        ()=>{this.orderEmote_0.hideEmote()},
        ()=>{this.reactionEmote_0.playTearEmoteAnim()},
        )
      npc.animation1 = npc.forceLeaveChair_0(
        (state: boolean)=>{this.chair_0.updateState(state)},
        (state: boolean)=>{this.timeBar_0.updateVisible(state)},
        ()=>{this.timeBar_0.resetBar()},
        ()=>{this.orderEmote_0.hideEmote()},
      )
    }
    else if(npc.getDidAnimationEnd() && !this.chair_1.getIsTaken()){
      npc.animation2 = npc.walkToChair_1(
        (state: boolean)=>{this.chair_1.updateState(state)},
        (state: boolean)=>{this.timeBar_1.updateVisible(state)},
        ()=>{this.timeBar_1.decrease(npc.getWaitTime())},
        ()=>{this.orderEmote_1.displayEmote(npc.getOrder())},
        ()=>{this.orderEmote_1.hideEmote()},
        ()=>{this.reactionEmote_1.playTearEmoteAnim()},
        )
      npc.animation3 = npc.forceLeaveChair_1(
        (state: boolean)=>{this.chair_1.updateState(state)},
        (state: boolean)=>{this.timeBar_1.updateVisible(state)},
        ()=>{this.timeBar_1.resetBar()},
        ()=>{this.orderEmote_1.hideEmote()},
      )
    }
    else if(npc.getDidAnimationEnd() && !this.chair_2.getIsTaken()){
      npc.animation4 = npc.walkToChair_2(
        (state: boolean)=>{this.chair_2.updateState(state)},
        (state: boolean)=>{this.timeBar_2.updateVisible(state)},
        ()=>{this.timeBar_2.decrease(npc.getWaitTime())},
        ()=>{this.orderEmote_2.displayEmote(npc.getOrder())},
        ()=>{this.orderEmote_2.hideEmote()},
        ()=>{this.reactionEmote_2.playTearEmoteAnim()},
        )
      npc.animation5 = npc.forceLeaveChair_2(
        (state: boolean)=>{this.chair_2.updateState(state)},
        (state: boolean)=>{this.timeBar_2.updateVisible(state)},
        ()=>{this.timeBar_2.resetBar()},
        ()=>{this.orderEmote_2.hideEmote()},
      )
    }
    
    // アニメーションの再生
    if (!this.chair_0.getIsTaken() && !npc.getIsOnMove() && !npc.getIsOnChair() && !npc.getIsLeaveing()) {
      this.chair_0.updateState(true);
      this.chair_0.setNpcOnChair(npc);
      npc.setIsServeFood(false);
      npc.animation0.play();
    } else if (npc.getIsServedFood() && this.chair_0.getIsTaken() && npc.getIsOnMove() && npc.getIsOnChair() && !npc.getIsLeaveing() && npc.getOnWhichChair() === 'chair_0') {
      this.chair_0.updateState(false);
      npc.animation0.stop();
      npc.animation1.play();
    }
    else if (!this.chair_1.getIsTaken() && !npc.getIsOnMove() && !npc.getIsOnChair() && !npc.getIsLeaveing()) {
      this.chair_1.updateState(true);
      this.chair_1.setNpcOnChair(npc);
      npc.setIsServeFood(false);
      npc.animation2.play();
    } 
    else if (npc.getIsServedFood() && this.chair_1.getIsTaken() && npc.getIsOnMove() && npc.getIsOnChair() && !npc.getIsLeaveing() && npc.getOnWhichChair() === 'chair_1') {
      this.chair_1.updateState(false);
      npc.animation2.stop();
      npc.animation3.play();
    }
    else if (!this.chair_2.getIsTaken() && !npc.getIsOnMove() && !npc.getIsOnChair() && !npc.getIsLeaveing()) {
      this.chair_2.updateState(true);
      this.chair_2.setNpcOnChair(npc);
      npc.setIsServeFood(false);
      npc.animation4.play();
    } 
    else if (npc.getIsServedFood() && this.chair_2.getIsTaken() && npc.getIsOnMove() && npc.getIsOnChair() && !npc.getIsLeaveing() && npc.getOnWhichChair() === 'chair_2') {
      this.chair_2.updateState(false);
      npc.animation4.stop();
      npc.animation5.play();
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
    if (this.isSpacePressed) {
      const [playerPositionX, playerPositionY] = this.player.getPlayerPosition()
      if ( 
        playerPositionX >= 200 && playerPositionX < 300 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.egg);
        this.sound_select_food.play();
      }
      else if ( 
        playerPositionX >= 300 && playerPositionX < 400 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.salmon);
        this.sound_select_food.play();
      }
      else if ( 
        playerPositionX >= 400 && playerPositionX < 500 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.shrimp);
        this.sound_select_food.play();
      }
      else if ( 
        playerPositionX >= 500 && playerPositionX < 600 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.tuna);
        this.sound_select_food.play();
      }
      else if ( 
        playerPositionX >= 600 && playerPositionX < 700 && 
        playerPositionY >= 152 && playerPositionY < 172
      ){
        this.checkFoodState(this.rice);
        this.sound_select_food.play();
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
      food.onDownSelected(130, false);
      food.setIsLoading(true);
      this.player.removeSelectedFood(food);
    } 
    else {
      food.onDownSelected(100,true);
      food.setIsLoading(true);
      this.player.addSelectedFood(food);
    }
  }
  
  checkFoodOrder(): void {
    if (this.isSpacePressed) {
      const [playerPositionX, playerPositionY] = this.player.getPlayerPosition()
      if ( 
        playerPositionX >= 150 && playerPositionX < 250 && 
        playerPositionY >= 212 && playerPositionY < 232
      ){
        if (!this.chair_0.getNpcOnChair()?.getIsOnChair()) return;
        this.judgeServeFood(this.chair_0, this.reactionEmote_0);
      }
      else if ( 
        playerPositionX >= 350 && playerPositionX < 450 && 
        playerPositionY >= 212 && playerPositionY < 232
      ){
        if (!this.chair_1.getNpcOnChair()?.getIsOnChair()) return;
        this.judgeServeFood(this.chair_1, this.reactionEmote_1);
      }
      else if ( 
        playerPositionX >= 550 && playerPositionX < 650 && 
        playerPositionY >= 212 && playerPositionY < 232
      ){
        if (!this.chair_2.getNpcOnChair()?.getIsOnChair()) return;
        this.judgeServeFood(this.chair_2, this.reactionEmote_2);
      }
    }
  }

  judgeServeFood(chair: Chair, reactionEmote: ReactionEmote): void {
    const orderedFood = chair.getNpcOnChair()!.getOrder();
    const npcOrderedMenu = this.foodMenu[orderedFood].sort((a, b)=>a.getFoodName()>b.getFoodName() ? -1 : 1)
    const playerSelectedMenu = this.player.getSelectedFoods().sort((a, b)=>a.getFoodName()>b.getFoodName() ? -1 : 1)

    if (npcOrderedMenu.every((food, index) => food == playerSelectedMenu[index])) {
      this.score++;
      this.displayScore.setText(String(this.score));
      this.player.setSelectedFood([]);
      this.resetFoodState();
      reactionEmote.playHappyEmoteAnim();
      this.sound_correct.play();
    }
    else {
      reactionEmote.playTearEmoteAnim();
      this.sound_wrong.play();
    }
    chair.getNpcOnChair()?.setIsServeFood(true);
    
  }

  resetFoodState(): void {
    this.egg.onDownSelected(130, false)
    this.salmon.onDownSelected(130, false)
    this.tuna.onDownSelected(130, false)
    this.shrimp.onDownSelected(130, false)
    this.rice.onDownSelected(130, false)
  }
}