import Phaser from "phaser";
import { GameTitle } from "../objects/game-title";
import { ScoreScreen } from "../objects/score-screen";
import { GameScene } from "./GameScene";
import { scoreCenter } from "./score-center";
import { sendHighScore } from '../../send-highscore';

import map from '../assets/maps/map_01.png';
import counterTable from '../assets/maps/counter_table.png';
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

import { loginNearWallet, isLoginNearWallet, getHighScore } from '../../init';

export class MyScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private isSpacePressed!: boolean;
  private isLogin!: boolean;
  private score!: number;
  private highScore!: number;
  private music!: Phaser.Sound.BaseSound;
  private RKey!: Phaser.Input.Keyboard.Key;
  private QKey!: Phaser.Input.Keyboard.Key;
  private EKey!: Phaser.Input.Keyboard.Key;
  private NKey!: Phaser.Input.Keyboard.Key;
  private isRKeyPressed!: boolean;
  private isNKeyPressed!: boolean;
  private titleScreen!: GameTitle;
  private isGameHappning!: boolean;
  private timelimitDuration!: number;
  private timerEvent!: Phaser.Time.TimerEvent;
  private countdownTimer!: Phaser.GameObjects.Text;
  // スコア画面
  private scoreScreen!: ScoreScreen;
  // プラグイン
  private plugin!: Phaser.Scenes.ScenePlugin;

  private isGuestLogin!: boolean;
  private isDisplayLogin!: boolean;

  constructor() {
    super({ key: 'myscene' });
    this.isGuestLogin = false;
    this.highScore = 0;
  }

  preload() {

    const foodAssetsPath: string = 'https://hashimoto.infura-ipfs.io/ipfs/QmeNGWA2Xi86zv7nJNRk7jdbSRJ42RBjbVzuaxzFzqYJfK';
    const soundAssetsPath: string = 'https://hashimoto.infura-ipfs.io/ipfs/QmST8VHuHot3L5P8cGsBYABX6dovQwuryRpB15stgx8ow7';

    this.textures.addBase64('map', map);
    this.textures.addBase64('table', counterTable);
    this.load.setCORS('anonymous');
    this.load.image('egg', `${foodAssetsPath}/egg.png`);
    this.load.image('salmon', `${foodAssetsPath}/salmon.png`);
    this.load.image('shrimp', `${foodAssetsPath}/shrimp.png`);
    this.load.image('tuna', `${foodAssetsPath}/tuna.png`);
    this.load.image('rice', `${foodAssetsPath}/rice.png`);
    this.load.image('egg_nigiri', `${foodAssetsPath}/egg_nigiri.png`);
    this.load.image('salmon-nigiri', `${foodAssetsPath}/salmon-nigiri.png`);
    this.load.image('tuna_nigiri', `${foodAssetsPath}/tuna_nigiri.png`);
    this.load.image('shrimp_nigiri', `${foodAssetsPath}/shrimp_nigiri.png`);
    this.load.image('sashimi_set', `${foodAssetsPath}/sashimi_set.png`);
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
    this.load.audio('correct', `${soundAssetsPath}/sound-correct.mp3`);
    this.load.audio('wrong', `${soundAssetsPath}/sound-wrong.mp3`);
    this.load.audio('select_food', `${soundAssetsPath}/sound-select-food.mp3`);
  }

  async create() {
    // 制限時間
    this.timelimitDuration = 10000;
    
    // Rキー
    this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    // Nキー
    this.NKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    // ゲームシーン導入
    this.scene.add('gameScene', GameScene, true, {x: 400, y: 300});

    this.cursors = this.input.keyboard.createCursorKeys();

    // スコア管理
    scoreCenter.on('update-score', this.updateScore, this);
    
     // ハイスコアのグローバル管理
    this.highScore = getHighScore();
    this.registry.set({highScore: this.highScore}, 'highScore');
    // ハイスコア管理
    scoreCenter.on('update-highScore', this.updateHighScore, this)

    this.score = 0;
    

    this.music = this.sound.add('game-bgm', {volume: 0.06, rate: 1.25, detune: -10, loop: true});

    this.music.play();

    // タイトル画面
    this.titleScreen = new GameTitle(this.add, this.tweens);

    this.isGameHappning = false;

    this.isLogin = false;

    this.isDisplayLogin = true;

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

    this.registry.set({isLogin: {near: isLoginNearWallet(), guest: this.isGuestLogin}} , 'isLogin');
    this.isLogin = this.registry.get('isLogin').near || this.registry.get('isLogin').guest
  }

  update () {
    this.gameStart();
    this.updateSpaceKey();
    this.updateRKey();
    this.updateNKey();
    this.updateCountdown();
  };

  updateHighScore():void {
    if (this.registry.get('highScore') <= this.registry.get('score')) {
      this.highScore = this.score;
      this.registry.values.highScore = this.highScore;
    }
  };

  updateCountdown() {
    this.countdownTimer.setText(String(Math.floor(this.timerEvent.getRemainingSeconds())))
  };

  updateRKey(): void {
    this.isRKeyPressed = Phaser.Input.Keyboard.JustDown(this.RKey);
  };

  updateNKey(): void {
    this.isNKeyPressed = Phaser.Input.Keyboard.JustDown(this.NKey);
  };

  updateScore():void {
    // gameSceneで更新したグローバルのスコアを参照
    this.score = this.registry.get('score');
  };

  async gameStart(): Promise<void> {
    if (!this.isLogin && Phaser.Input.Keyboard.JustDown(this.EKey)) {
      this.titleScreen.hideLoginText();
      this.titleScreen.showAll();
      this.isGuestLogin = true;
      this.isLogin=true;
      this.registry.set({'isLogin': {'near': false, 'guest': true}}, 'isLogin')
    } else if ( !this.isLogin && Phaser.Input.Keyboard.JustDown(this.QKey) ){
      loginNearWallet();
    } else if (this.isLogin  && this.isDisplayLogin) {
      this.titleScreen.hideLoginText();
      this.titleScreen.showAll();
      this.isDisplayLogin = false;
    }

    if (!this.isLogin) {
      return;
    }

    if (this.isSpacePressed && !this.isGameHappning && !this.plugin.isSleeping('gameScene')) {
      this.isGameHappning = true;
      this.titleScreen.hideAll();
      this.plugin.resume('gameScene')
      this.timer();
    } else if (this.isRKeyPressed && this.plugin.isSleeping('gameScene')) {
      this.music.stop();
      this.plugin.remove('gameScene');
      this.plugin.restart();
    } else if (isLoginNearWallet() && this.isNKeyPressed && this.plugin.isSleeping('gameScene')) {
      sendHighScore(this.highScore);
    }
  };

  finishGame(): void {
    this.isGameHappning = false;
    this.plugin.sleep('gameScene');
    scoreCenter.emit('update-highScore')
    this.scoreScreen.displayAll();
    this.scoreScreen.displayScore(this.score);
    this.scoreScreen.displayHighScore(this.highScore);
    // scoreCenter.removeListener('update-score', this.updateScore, this);
    console.log(this.registry)
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