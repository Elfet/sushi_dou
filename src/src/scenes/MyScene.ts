import Phaser from "phaser";
import { GameTitle } from "../objects/game-title";
import { ScoreScreen } from "../objects/score-screen";
import { GameScene } from "./GameScene";
import { scoreCenter } from "./score-center";

import map from '../assets/maps/map_01.png';
import counterTable from '../assets/maps/counter_table.png';
import egg from '../assets/foods/egg.png';
import salmon from '../assets/foods/salmon.png';
import shrimp from '../assets/foods/shrimp.png';
import tuna from '../assets/foods/tuna.png';
import rice from '../assets/foods/rice.png';
import eggNigiri from '../assets/foods/egg_nigiri.png';
import salmongNigiri from '../assets/foods/salmon-nigiri.png';
import tunaNigiri from '../assets/foods/tuna_nigiri.png';
import shrimpNigiri from '../assets/foods/shrimp_nigiri.png';
import sashimiSet from '../assets/foods/sashimi_set.png';
import emoteBase from '../assets/characters/emote_base.png';
import emoteHappy from '../assets/characters/emote_happy.png';
import emoteHeart from '../assets/characters/emote_heart.png';
import emoteTear from '../assets/characters/emote_tear.png';
import chair from '../assets/maps/chair.png';
import title_background from '../assets/maps/title_background.png';
import score_background from '../assets/maps/score_background.png';
import chef from '../assets/characters/Chef_Alex_48x48.png';
import npcFemale0 from '../assets/characters/npc_female_0.png';
import npcFemale1 from '../assets/characters/npc_female_1.png';
import npcFemale2 from '../assets/characters/npc_female_2.png';
import npcMale0 from '../assets/characters/npc_male_0.png';
import npcMale1 from '../assets/characters/npc_male_1.png';
import npcMale2 from '../assets/characters/npc_male_2.png';
import npcMale3 from '../assets/characters/npc_male_3.png';
import bgm from '../assets/music-sound/game-bgm_0.ogg';
import soundCorrect from '../assets/music-sound/sound-correct.mp3';
import soundWrong from '../assets/music-sound/sound-wrong.mp3';
import soundSelectFood from '../assets/music-sound/sound-select-food.mp3';


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
    this.textures.addBase64('map', map);
    this.textures.addBase64('egg', egg);
    this.textures.addBase64('table', counterTable);
    this.textures.addBase64('salmon', salmon);
    this.textures.addBase64('shrimp', shrimp);
    this.textures.addBase64('tuna', tuna);
    this.textures.addBase64('rice', rice);
    this.textures.addBase64('egg_nigiri', eggNigiri);
    this.textures.addBase64('salmon-nigiri', salmongNigiri);
    this.textures.addBase64('tuna_nigiri', tunaNigiri);
    this.textures.addBase64('shrimp_nigiri', shrimpNigiri);
    this.textures.addBase64('sashimi_set', sashimiSet);
    this.textures.addBase64('emote_base', emoteBase);
    this.textures.addBase64('emote_happy', emoteHappy);
    this.textures.addBase64('emote_heart', emoteHeart);
    this.textures.addBase64('emote_tear', emoteTear);
    this.textures.addBase64('chair', chair);
    this.textures.addBase64('title_bg', title_background);
    this.textures.addBase64('score_bg', score_background);
    this.load.spritesheet('player', chef, { frameWidth: 48, frameHeight: 96});
    this.load.spritesheet('npc_0', npcFemale0, { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_1', npcFemale1, { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_2', npcFemale2, { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_3', npcMale0, { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_4', npcMale1, { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_5', npcMale2, { frameWidth: 48, frameHeight: 96 });
    this.load.spritesheet('npc_6', npcMale3, { frameWidth: 48, frameHeight: 96 });
    // 音楽
    this.load.audio('game-bgm', bgm);
    // 効果音
    this.load.audio('correct', soundCorrect);
    this.load.audio('wrong', soundWrong);
    this.load.audio('select_food', soundSelectFood);
  }

  create() {
    // 制限時間
    this.timelimitDuration = 30000;

    // Rキー
    this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // ゲームシーン導入
    this.scene.add('gameScene', GameScene, true, {x: 400, y: 300});

    this.cursors = this.input.keyboard.createCursorKeys();

    // スコア管理
    scoreCenter.on('update-score', this.updateScore, this);

    this.score = 0;

    this.music = this.sound.add('game-bgm', {volume: 0.06, rate: 1.25, detune: -10, loop: true});

    this.music.play();

    // タイトル画面
    this.titleScreen = new GameTitle(this.add, this.tweens);

    this.isGameHappning = false;

    // タイマーイベント
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
  };

  updateCountdown() {
    this.countdownTimer.setText(String(Math.floor(this.timerEvent.getRemainingSeconds())))
  };

  updateRKey(): void {
    this.isRKeyPressed = Phaser.Input.Keyboard.JustDown(this.RKey);
  };

  updateScore():void {
    // gameSceneで更新したグローバルのスコアを参照
    this.score = this.registry.get('score');
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