export class TimeBar {
  private bar: Phaser.GameObjects.Graphics;
  private x: number;
  private y: number;
  private value: number;
  private intervalId!: NodeJS.Timer;

  constructor(
    scene: Phaser.Scene,
    add: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
  ) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.value = 60;
    this.draw();
    add.existing(this.bar);
    // this.intervalId = 0;
    // 初期状態では非表示
    this.bar.visible = false;
  }


  decreaseBar (amount: number):void {
    this.value = this.value - amount;
    // 0またはそれ以下になったらsetIntervalを止めてゲージを元に戻す
    this.draw();
    if (this.value <= 0) {
      clearInterval(this.intervalId);
      this.value = 60;
    }
  };

  // npcのwaitTimeを受け取って、バーの横幅のピクセル数で割る
  // 割って出した数字を使ってsetIntervalでゲージを減らす
  // これによりゲージを1ずつ減らす動作が、npcのwaitTimeに沿って終わるようになる
  decrease (waitTime: number):void {
    this.intervalId = setInterval(()=>{this.decreaseBar(1);}, waitTime / this.value);
  };

  updateVisible (state: boolean):void {
    this.bar.visible = state;
  };

  // ゲージをリセット
  resetBar () {
    clearInterval(this.intervalId);
    this.value = 60;
    this.draw();
  }

  // ゲージの描画
  draw ():void {
    this.bar.clear();
    // ゲージのボーダーの色
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 62, 12);
    // ゲージの背景色
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 1, this.y + 1, 60, 10);
    if (this.value < 30) {
      // ゲージが半分以下になったときの色
      this.bar.fillStyle(0xff0000);
    }
    else {
      // それ以外のときの色
      this.bar.fillStyle(0x00ff00);
    }
    // 上のif文の結果の色でバーを塗る。横幅はvalueに依存
    this.bar.fillRect(this.x + 1, this.y + 1, this.value, 10);
  };
}