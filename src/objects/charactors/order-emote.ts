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
    this.hideEmote();
  };

  hideEmote ():void {
    this.emote.visible = false;
    this.salmon_nigiri.visible = false;
    this.tuna_nigiri.visible = false;
    this.shrimp_nigiri.visible = false;
    this.egg_nigiri.visible = false;
    this.sashimi_set.visible = false;
  }

  // オーダーを受け取って表示する
  displayEmote (order: string):void {
    this.emote.visible = true;
    if (order === 'salmon_nigiri') {
      this.salmon_nigiri.visible = true;
    }
    else if (order === 'tuna_nigiri') {
      this.tuna_nigiri.visible = true;
    }
    else if (order === 'shrimp_nigiri') {
      this.shrimp_nigiri.visible = true;
    }
    else if (order === 'egg_nigiri') {
      this.egg_nigiri.visible = true;
    }
    else if (order === 'sashimi_set') {
      this.sashimi_set.visible = true;
    }
    else {
      this.salmon_nigiri.visible = true;
    }
  };
}