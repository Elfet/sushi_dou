export class GameTitle {
  private image: Phaser.GameObjects.Image;
  private gameExplanation!: Phaser.GameObjects.Text;
  private controlExplanation!: Phaser.GameObjects.Text;
  private interactExplanation!: Phaser.GameObjects.Text;
  private howToStart!: Phaser.GameObjects.Text;
  private loginExplanation!: Phaser.GameObjects.Text;
  
  constructor (
    add: Phaser.GameObjects.GameObjectFactory,
    tweens: Phaser.Tweens.TweenManager,
  ) {
    // 背景
    this.image = add.image(400, 300, 'title_bg');
    this.image.depth = 4;

    // ゲームのコンセプト
    this.gameExplanation = add.text(
      135,
      225,
      'You   are   a   chef   at   a   Sushi   Restaurant .\nCustomers   want   food   made   of   fresh   raw   fish .\nChoose   the   right   ingredients   for   their   order\nand   be   as   quick   as   you   can   to   serve   them !',
      { fontFamily: 'font1', fontSize: '18px', color: 'white'}
    )
    this.gameExplanation.depth = 4;
    this.gameExplanation.setLineSpacing(10);
    this.gameExplanation.visible = false;

    // プレイヤーの操作
    this.controlExplanation = add.text(
      215,
      410,
      '↑  ↓  ←  →  Cursor Keys  :  Move',
      { fontFamily: 'font1', fontSize: '20px', color: 'white'}
    )
    this.controlExplanation.depth = 4;
    this.controlExplanation.visible = false;

    // 食べ物の選択とオーダー提供
    this.interactExplanation = add.text(
      105,
      460,
      'SpaceKey  :  Choose   food   and   serve   customers',
      { fontFamily: 'font1', fontSize: '20px', color: 'white'}
    )
    this.interactExplanation.depth = 4;
    this.interactExplanation.visible = false;

    // ゲームスタート
    this.howToStart = add.text(
      245,
      525,
      'Press Space To Start',
      { fontFamily: 'font1', fontSize: '25px',color: 'white' }
    )
    this.howToStart.depth = 4;
    this.howToStart.visible = false;

    // テキストの点滅
    tweens.timeline({
      loop: -1,
      tweens: [
        {
          targets: this.howToStart,
          alpha: 0.125,
          ease: 'Linear',
        },
        {
          targets: this.howToStart,
          alpha: 1,
          ease: 'Power2',
        }
      ]
    })

    this.loginExplanation = add.text(
      135,
      350,
      'Play   with   Near   Wallet   :   Press   Q\n\n       Play   with   Guest   :   Press   E',
      { fontFamily: 'font1', fontSize: '25px', color: 'white'}
    )
    this.loginExplanation.depth = 4;
  }

  hideAll() {
    this.image.visible = false;
    this.gameExplanation.visible = false;
    this.controlExplanation.visible = false;
    this.interactExplanation.visible = false;
    this.howToStart.visible = false;
  }

  showAll() {
    this.image.visible = true;
    this.gameExplanation.visible = true;
    this.controlExplanation.visible = true;
    this.interactExplanation.visible = true;
    this.howToStart.visible = true;
  }

  hideLoginText() {
    this.loginExplanation.visible = false;
  }
}