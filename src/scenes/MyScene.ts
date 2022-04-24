import Phaser from "phaser";
import { GameTitle } from "../objects/game-title";
import { ScoreScreen } from "../objects/score-screen";
import { GameScene } from "./GameScene";
import { scoreCenter } from "./score-center";

export class MyScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private isSpacePressed!: boolean;
  private score!: number;
  private music!: Phaser.Sound.BaseSound;
  private RKey!: Phaser.Input.Keyboard.Key;
  private isRKeyPressed!: boolean;
  private titleScreen!: GameTitle;
  private isGameHappning!: boolean;
  private timelimitDuration!: number;
  private timerEvent!: Phaser.Time.TimerEvent;
  private countdownTimer!: Phaser.GameObjects.Text;
  // スコア画面
  private scoreScreen!: ScoreScreen;
  // プラグイン
  private plugin!: Phaser.Scenes.ScenePlugin;

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
    this.load.image('title_bg', 'src/assets/maps/title_background.png');
    this.load.image('score_bg', 'src/assets/maps/score_background.png');
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
    // 制限時間
    this.timelimitDuration = 30000;

    // Rキー
    this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // ゲームシーン導入
    this.scene.add('gameScene', GameScene, true, {x: 400, y: 300});

    this.cursors = this.input.keyboard.createCursorKeys();

    scoreCenter.on('update-score', this.updateScore, this);

    this.score = 0;

    this.music = this.sound.add('game-bgm', {volume: 0.06, rate: 1.25, detune: -10, loop: true});

    this.music.play();

    // タイトル画面
    this.titleScreen = new GameTitle(this.add, this.tweens);

    this.isGameHappning = false;

    this.timerEvent = new Phaser.Time.TimerEvent({
      delay: this.timelimitDuration,
      callback: ()=>{
        this.finishGame();
      }
    })
  
    // タイマーのテキスト
    this.add.text(540, 60, 'Time Limit :', { fontFamily: 'font1', fontSize: '20px', color: 'black' })

    // カウントダウンタイマー
    this.countdownTimer = this.add.text(
      660,
      60,
      `${this.timelimitDuration / 1000}`,
      { fontFamily: 'font1', fontSize: '20px', color: 'black'}
    )
    
    // スコアの画面
    this.scoreScreen = new ScoreScreen(this.add, this.tweens);
    // プラグイン
    this.plugin = new Phaser.Scenes.ScenePlugin(this);
    // gameSceneの上に重ねるようにする
    this.plugin.bringToTop('myscene');
    // ゲーム開始までは止めておく
    this.plugin.pause('gameScene')
  }

  update () {
    this.gameStart();
    this.updateSpaceKey();
    this.updateRKey();
    this.updateCountdown();
  }

  updateCountdown() {
    this.countdownTimer.setText(String(Math.floor(this.timerEvent.getRemainingSeconds())))
  };

  updateRKey(): void {
    this.isRKeyPressed = Phaser.Input.Keyboard.JustDown(this.RKey);
  };

  updateScore():void {
    this.score++;
  };

  gameStart(): void {
    if (this.isSpacePressed && !this.isGameHappning && !this.plugin.isSleeping('gameScene')) {
      this.isGameHappning = true;
      this.titleScreen.hideAll();
      this.plugin.resume('gameScene')
      this.timer();
    } else if (this.isRKeyPressed && this.plugin.isSleeping('gameScene')) {
      this.music.stop();
      this.plugin.remove('gameScene');
      this.plugin.restart();
    }
  };

  finishGame(): void {
    this.isGameHappning = false;
    this.plugin.sleep('gameScene');
    this.scoreScreen.displayAll();
    this.scoreScreen.displayScore(this.score);
    scoreCenter.removeListener('update-score', this.updateScore, this);
  };

  timer(): void {
    this.timerEvent.reset({
      delay: this.timelimitDuration,
      callback: ()=>{
        this.finishGame();
      }
    });
    this.time.addEvent(this.timerEvent);
  };

  updateSpaceKey(): void{
    this.isSpacePressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
  };
}