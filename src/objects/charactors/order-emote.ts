export class OrderEmote {
  private emote: Phaser.GameObjects.Image;
  private salmon_nigiri: Phaser.GameObjects.Image;
  private tuna_nigiri: Phaser.GameObjects.Image;
  private egg_nigiri: Phaser.GameObjects.Image;
  private shrimp_nigiri: Phaser.GameObjects.Image;
  private sashimi_set: Phaser.GameObjects.Image;

  constructor(
    x: number,
    y: number,
    add: Phaser.GameObjects.GameObjectFactory,
  ) {
    this.emote = add.image(x, y, 'emote_base').setScale(1.5);
    this.salmon_nigiri = add.image(x - 1, y - 5, 'salmon-nigiri');
    this.tuna_nigiri = add.image(x - 1, y - 5, 'tuna_nigiri');
    this.egg_nigiri = add.image(x - 1, y - 5, 'egg_nigiri');
    this.shrimp_nigiri = add.image(x - 1, y - 5, 'shrimp_nigiri');
    this.sashimi_set = add.image(x - 1, y - 5, 'sashimi_set');
    this.initializeOrder();
  };

  initializeOrder ():void {
    this.emote.visible = false;
    this.salmon_nigiri.visible = false;
    this.tuna_nigiri.visible = false;
    this.shrimp_nigiri.visible = false;
    this.egg_nigiri.visible = false;
    this.sashimi_set.visible = false;
  }


  // ランダムで食べ物を表示し、オーダー名を返す
  orderRandom ():string {
    this.emote.visible = true;
    let randomNumber:number = Math.random() * 10 / 2;
    if (randomNumber >= 0 && randomNumber < 1) {
      this.salmon_nigiri.visible = true;
      return 'salmon_nigiri';
    }
    else if (randomNumber >= 1 && randomNumber < 2) {
      this.tuna_nigiri.visible = true;
      return 'tuna_nigiri';
    }
    else if (randomNumber >= 2 && randomNumber < 3) {
      this.shrimp_nigiri.visible = true;
      return 'shrimp_nigiri';
    }
    else if (randomNumber >= 3 && randomNumber < 4) {
      this.egg_nigiri.visible = true;
      return 'egg_nigiri';
    }
    else if (randomNumber >= 4 && randomNumber < 5) {
      this.sashimi_set.visible = true;
      return 'sashimi_set';
    }
    else {
      this.salmon_nigiri.visible = true;
      return 'salmon_nigiri';
    }
  };
}