export class Chair{
  public image : Phaser.GameObjects.Image;
  private add: Phaser.GameObjects.GameObjectFactory;

  constructor(
    add: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    chairName: string
  ) {
    this.add = add;
    this.image = this.add.image(x, y, chairName).setScale(1.5);
  }
}