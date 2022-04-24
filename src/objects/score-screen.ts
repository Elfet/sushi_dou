export class ScoreScreen {
  private image: Phaser.GameObjects.Image;
  private add: Phaser.GameObjects.GameObjectFactory;

  constructor (
    add: Phaser.GameObjects.GameObjectFactory,
  ) {
    this.add = add;
    this.image = add.image(400, 300, 'score_bg');
    this.image.depth = 4;
    // 初期状態は非表示
    this.hideAll();
  }

  displayScore(score: number) {
    const text: Phaser.GameObjects.Text = this.add.text(
      240,
      80,
      `SCORE   :   ${score}`,
      { fontFamily: 'font1', fontSize: '40px', color: 'white'}
    )
    text.depth = 4;
  };

  displayAll() {
    this.image.visible = true;
  }

  hideAll() {
    this.image.visible = false;
  }
}