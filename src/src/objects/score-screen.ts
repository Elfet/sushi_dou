export class ScoreScreen {
  private image: Phaser.GameObjects.Image;
  private add: Phaser.GameObjects.GameObjectFactory;
  private howToRestart!: Phaser.GameObjects.Text;
  private nearText0: Phaser.GameObjects.Text;
  private nearText1: Phaser.GameObjects.Text;
  private nearText3: Phaser.GameObjects.Text;
  private nearText4: Phaser.GameObjects.Text;

  constructor (
    add: Phaser.GameObjects.GameObjectFactory,
    tweens: Phaser.Tweens.TweenManager,
  ) {
    this.add = add;
    this.image = add.image(400, 300, 'score_bg');
    this.image.depth = 4;
    // ゲームのリスタート
    this.howToRestart = add.text(
      165,
      525,
      'Press   R   To   Go   Back   To   Title',
      { fontFamily: 'font1', fontSize: '25px', color: 'white'}
    )
    this.howToRestart.depth = 4;
    // テキストの点滅
    tweens.timeline({
      loop: -1,
      tweens: [
        {
          targets: this.howToRestart,
          alpha: 0.125,
          ease: 'Linear',
        },
        {
          targets: this.howToRestart,
          alpha: 1,
          ease: 'Power2',
        }
      ]
    })
    // NEARにHighScoreを送るテキスト
    this.nearText0 = add.text(
      95,
      380,
      'Press  N  To  Save  The  High  Score',
      { fontFamily: 'font1', fontSize: '30px', color: 'yellow'}
    )
    this.nearText0.depth = 4;
    // テキストの点滅
    tweens.timeline({
      loop: -1,
      tweens: [
        {
          targets: this.nearText0,
          alpha: 0.125,
          ease: 'Linear',
        },
        {
          targets: this.nearText0,
          alpha: 1,
          ease: 'Power2',
        }
      ]
    })
    // NEARにHighScoreを送るテキスト
    this.nearText1 = add.text(
      220,
      430,
      'In  Your  NEAR  Wallet',
      { fontFamily: 'font1', fontSize: '30px', color: 'yellow'}
    )
    this.nearText1.depth = 4;
    // テキストの点滅
    tweens.timeline({
      loop: -1,
      tweens: [
        {
          targets: this.nearText1,
          alpha: 0.125,
          ease: 'Linear',
        },
        {
          targets: this.nearText1,
          alpha: 1,
          ease: 'Power2',
        }
      ]
    })
    // NEARにHighScoreを送るテキスト
    this.nearText3 = add.text(
      95,
      380,
      'You  Can  Save  The  High  Score  If',
      { fontFamily: 'font1', fontSize: '30px', color: 'yellow'}
    )
    this.nearText3.depth = 4;
    // テキストの点滅
    tweens.timeline({
      loop: -1,
      tweens: [
        {
          targets: this.nearText3,
          alpha: 0.125,
          ease: 'Linear',
        },
        {
          targets: this.nearText3,
          alpha: 1,
          ease: 'Power2',
        }
      ]
    })
    // NEARにHighScoreを送るテキスト
    this.nearText4 = add.text(
      85,
      430,
      'You  Have  A  NEAR  Testnet  Account',
      { fontFamily: 'font1', fontSize: '30px', color: 'yellow'}
    )
    this.nearText4.depth = 4;
    // テキストの点滅
    tweens.timeline({
      loop: -1,
      tweens: [
        {
          targets: this.nearText4,
          alpha: 0.125,
          ease: 'Linear',
        },
        {
          targets: this.nearText4,
          alpha: 1,
          ease: 'Power2',
        }
      ]
    })

    // 初期状態は非表示
    this.hideAll();
  }

  displayHighScore(highScore: number) {
    const text: Phaser.GameObjects.Text = this.add.text(
      210,
      240,
      `HIGHSCORE   :   ${highScore}`,
      { fontFamily: 'font1', fontSize: '40px', color: 'white'}
    )
    text.depth = 4;
  };

  displayScore(score: number) {
    const text: Phaser.GameObjects.Text = this.add.text(
      270,
      70,
      `SCORE   :   ${score}`,
      { fontFamily: 'font1', fontSize: '40px', color: 'white'}
    )
    text.depth = 4;
  };

  displayAll() {
    this.image.visible = true;
    this.howToRestart.visible = true;
    this.nearText0.visible = true;
    this.nearText1.visible = true;
    this.nearText3.visible = true;
    this.nearText4.visible = true;
  };

  hideAll() {
    this.image.visible = false;
    this.howToRestart.visible = false;
    this.nearText0.visible = false;
    this.nearText1.visible = false;
    this.nearText3.visible = false;
    this.nearText4.visible = false;
  };
}