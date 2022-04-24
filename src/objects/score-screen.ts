export class ScoreScreen {
  private image: Phaser.GameObjects.Image;
  private add: Phaser.GameObjects.GameObjectFactory;
  private howToRestart!: Phaser.GameObjects.Text;

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
    // 初期状態は非表示
    this.hideAll();
  }

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
  };

  hideAll() {
    this.image.visible = false;
    this.howToRestart.visible = false;
  };
}